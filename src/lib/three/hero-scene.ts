import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { gsap } from "@/lib/gsap";
import { enableDrag } from "./drag-controls";
import { makeVariant, stash, startSwaps, type SwapSlot } from "./morph-swap";

export type HeroModel = {
  /** .glb path (Draco + WebP). */
  model: string;
  /** Visible bounds (px) of the object in the Figma frame — the model is fitted to this box. */
  x: number;
  y: number;
  w: number;
  h: number;
  /** Resting orientation (radians, XYZ) so the model matches the Figma pose. */
  pose: [number, number, number];
  /** Extra upward travel (px) while the hero scrolls away. */
  drift: number;
  /** `model` of the partner this object periodically morph-swaps with (declare on one side). */
  swapWith?: string;
};

type Options = {
  /** Element the scene's own <canvas> is appended to (sized to fill it). */
  host: HTMLElement;
  /** Size (px) of the design frame the canvas covers. */
  frame: { width: number; height: number };
  models: HeroModel[];
  /** Hero section: its scroll-out drives the scroll animation; it receives drag input. */
  trigger: HTMLElement;
  /** False for prefers-reduced-motion: render the resting poses only. */
  motion: boolean;
};

const FOV = 30;

/** Poses `object` and scales/centres it to fill a w×h box around the origin. */
function fitInto(object: THREE.Object3D, pose: HeroModel["pose"], w: number, h: number) {
  object.position.set(0, 0, 0);
  object.scale.setScalar(1);
  object.rotation.set(...pose);
  const bounds = new THREE.Box3().setFromObject(object, true);
  const size = bounds.getSize(new THREE.Vector3());
  const scale = Math.min(w / size.x, h / size.y);
  object.scale.setScalar(scale);
  object.position.copy(bounds.getCenter(new THREE.Vector3()).multiplyScalar(-scale));
  return object;
}

/** Index of the model `models[i]` swaps with, or -1. */
const partnerOf = (models: HeroModel[], i: number) =>
  models.findIndex((m, j) => j !== i && (m.model === models[i].swapWith || m.swapWith === models[i].model));

/** Every mesh under `root` with its materials and their textures. */
function meshParts(root: THREE.Object3D) {
  const parts: { mesh: THREE.Mesh; materials: THREE.Material[]; textures: THREE.Texture[] }[] = [];
  root.traverse((node) => {
    if (!(node instanceof THREE.Mesh)) return;
    const materials = [node.material].flat();
    const textures = materials.flatMap((m) => Object.values(m).filter((v) => v instanceof THREE.Texture));
    parts.push({ mesh: node, materials, textures });
  });
  return parts;
}

/**
 * Renders the hero's 3D objects in one WebGL canvas. Scene units = CSS px of the design
 * frame, so models are placed straight from Figma coordinates.
 * Resolves once every model is loaded and drawn; returns a dispose function.
 */
export async function mountHeroScene({ host, frame, models, trigger, motion }: Options) {
  // Each mount owns its canvas: a canvas has a single WebGL context, and two renderers
  // sharing one (e.g. React Strict Mode's double mount) corrupt each other's state.
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
  const canvas = renderer.domElement;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  // Size from the rendered box (accounts for CSS zoom); the canvas is stretched to fill the host.
  const fit = () => {
    const { width, height } = host.getBoundingClientRect();
    renderer.setSize(width, height, false);
    return width / height;
  };
  const aspect = fit();
  canvas.style.cssText = "display:block;width:100%;height:100%";
  renderer.toneMapping = THREE.NeutralToneMapping;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = environment;
  scene.environmentIntensity = 0.45;

  const key = new THREE.DirectionalLight("#ffe3c2", 1.9);
  key.position.set(-500, 700, 900);
  const rim = new THREE.DirectionalLight("#ffb27a", 1.2);
  rim.position.set(700, 200, -400);
  scene.add(key, rim);

  // Perspective camera where 1 unit = 1px on the z=0 plane.
  const distance = frame.height / 2 / Math.tan(THREE.MathUtils.degToRad(FOV / 2));
  const camera = new THREE.PerspectiveCamera(FOV, aspect, 1, distance * 3);
  camera.position.z = distance;

  const draco = new DRACOLoader().setDecoderPath("/draco/");
  const loader = new GLTFLoader().setDRACOLoader(draco);

  const sources = await Promise.all(models.map(({ model }) => loader.loadAsync(model).then((gltf) => gltf.scene)));
  draco.dispose();

  // intro (load-in) > drag (pointer) > scroll (scrubbed) > float (idle loop) > morph (swap) > fitted model(s)
  // A swapping slot also holds its partner's model (a clone: geometry + textures shared), fitted to this slot's box.
  const partners = models.map((_, i) => (motion ? partnerOf(models, i) : -1));
  const clones = partners.map((j) => (j < 0 ? null : sources[j].clone()));
  const rigs = models.map(({ x, y, w, h, pose }, i) => {
    const object = fitInto(sources[i], pose, w, h);
    const morph = new THREE.Group().add(object);
    const clone = clones[i];
    const variants =
      clone && ([makeVariant(object), makeVariant(fitInto(clone, models[partners[i]].pose, w, h))] as SwapSlot["variants"]);
    if (variants) morph.add(variants[1].root);

    const float = new THREE.Group().add(morph);
    const scroll = new THREE.Group().add(float);
    const drag = new THREE.Group().add(scroll);
    const intro = new THREE.Group().add(drag);
    intro.position.set(x + w / 2 - frame.width / 2, frame.height / 2 - (y + h / 2), 0);
    scene.add(intro);
    const idle: gsap.core.Tween[] = [];
    const side = Math.sign(x + w / 2 - frame.width / 2);
    const slot: SwapSlot | null = variants && { morph, variants, side, held: false };
    return { intro, drag, scroll, float, morph, idle, side, slot };
  });

  // Upload textures and compile shaders before the first visible frame (no pop-in).
  for (const { textures } of meshParts(scene)) textures.forEach((texture) => renderer.initTexture(texture));
  // compile skips hidden objects, so partner models are hidden only after (no hitch on the first swap).
  await renderer.compileAsync(scene, camera);
  for (const { slot } of rigs) if (slot) stash(slot.variants[1]);

  const render = () => renderer.render(scene, camera);
  render();
  host.append(canvas);

  // Keep the canvas matched to its host (no stretching).
  const resizeObserver = new ResizeObserver(() => {
    camera.aspect = fit();
    camera.updateProjectionMatrix();
  });
  resizeObserver.observe(host);

  // Only render while the hero is on screen.
  let visible = true;
  const observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
  observer.observe(canvas);
  const tick = () => {
    if (visible) render();
  };

  const ctx = gsap.context(() => {
    if (!motion) return;

    rigs.forEach(({ intro, scroll, float, idle, side }, i) => {
      gsap.from(intro.scale, { x: 0.6, y: 0.6, z: 0.6, duration: 1.4, ease: "expo.out", delay: i * 0.08 });
      gsap.from(intro.rotation, { y: -side * 0.9, duration: 1.8, ease: "expo.out", delay: i * 0.08 });

      const period = 3.2 + i * 0.55;
      idle.push(
        gsap.to(float.position, { y: 14, duration: period, ease: "sine.inOut", yoyo: true, repeat: -1, delay: -i }),
        gsap.to(float.rotation, {
          y: 0.22 * side,
          z: 0.05 * side,
          duration: period * 1.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: -i * 0.7,
        }),
      );

      gsap
        .timeline({ scrollTrigger: { trigger, start: "top top", end: "bottom top", scrub: 1 } })
        .to(scroll.position, { y: models[i].drift, x: side * 60, ease: "none" }, 0)
        .to(scroll.rotation, { y: side * Math.PI * 0.6, x: 0.35, ease: "none" }, 0);
    });
  });

  // Paired slots morph-swap on an interval (skipped while off screen or held).
  const slots = rigs.map(({ slot }) => slot);
  const pairs = partners.flatMap((j, i) => {
    const [a, b] = [slots[i], slots[j]];
    return a && b && i < j ? [[a, b] as [SwapSlot, SwapSlot]] : [];
  });
  const stopSwaps = startSwaps({ pairs, isActive: () => visible });

  // Grab-and-throw; idle float (and swaps) pause while held and resume once back at rest.
  const disableDrag = enableDrag({
    surface: trigger,
    canvas,
    camera,
    frameHeight: frame.height,
    motion,
    items: rigs.map(({ morph, drag, idle, slot }) => ({
      root: morph,
      handle: drag,
      onGrab: () => {
        idle.forEach((tween) => tween.pause());
        if (slot) slot.held = true;
      },
      onRest: () => {
        idle.forEach((tween) => tween.resume());
        if (slot) slot.held = false;
      },
    })),
  });

  gsap.ticker.add(tick);

  return () => {
    stopSwaps();
    disableDrag();
    gsap.ticker.remove(tick);
    ctx.revert();
    observer.disconnect();
    resizeObserver.disconnect();
    for (const { mesh, materials, textures } of meshParts(scene)) {
      mesh.geometry.dispose();
      textures.forEach((texture) => texture.dispose());
      materials.forEach((material) => material.dispose());
    }
    environment.dispose();
    pmrem.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    canvas.remove();
  };
}
