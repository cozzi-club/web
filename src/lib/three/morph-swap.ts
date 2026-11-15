import * as THREE from "three";
import { gsap } from "@/lib/gsap";

/** One model inside a slot; `progress` 0 = solid, 1 = fully dissolved. */
export type Variant = { root: THREE.Object3D; progress: { value: number } };

export type SwapSlot = {
  /** Group spun/pinched by the swap (parent of both variants). */
  morph: THREE.Group;
  /** [shown at rest, hidden partner]; roles flip after every swap. */
  variants: [Variant, Variant];
  /** -1 left / 1 right: pairs spin in mirror. */
  side: number;
  /** True while the user is dragging this slot (swaps wait). */
  held: boolean;
};

type Options = {
  /** Each pair swaps together; pairs take turns, one swap at a time. */
  pairs: [SwapSlot, SwapSlot][];
  /** False while the hero is off screen: that beat is skipped. */
  isActive: () => boolean;
};

const TURN = Math.PI * 2;
// Spin = one turn speeding up (power2.in) + one turn slowing down (power3.out). The slow-down
// lasts 3/2 as long, so both meet at the same top speed (~20°/frame at 60fps, no strobing)
// and the tail is long and soft instead of a visible stop.
const SPIN_UP = 0.6;
const SPIN_DOWN = SPIN_UP * 1.5;
const SETTLE = 1.3; // pinch, hop and tilt ease back for this long after peak speed, outlasting the spin
const PINCH = 0.82; // scale at the swap moment
const LIFT = 12; // px of hop during the swap
const TILT = 0.16; // rad of forward lean while spinning
const INTERVAL = 10; // seconds between swaps; pairs alternate, so each pair swaps every 2 × INTERVAL
const FIRST = 3.5; // after the intro has settled
const RETRY = 0.5; // a held pair checks again this often

const EDGE = 0.08; // width of the glowing burn edge (noise units)
const EDGE_COLOR = new THREE.Color("#ff9a4d").multiplyScalar(4);

const NOISE_GLSL = /* glsl */ `
uniform float uDissolve;
uniform float uDissolveScale;
uniform vec3 uDissolveEdge;
varying vec3 vDissolvePos;
float dissolveHash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1) * 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}
float dissolveNoise(vec3 x) {
  vec3 i = floor(x);
  vec3 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(dissolveHash(i), dissolveHash(i + vec3(1, 0, 0)), f.x),
        mix(dissolveHash(i + vec3(0, 1, 0)), dissolveHash(i + vec3(1, 1, 0)), f.x), f.y),
    mix(mix(dissolveHash(i + vec3(0, 0, 1)), dissolveHash(i + vec3(1, 0, 1)), f.x),
        mix(dissolveHash(i + vec3(0, 1, 1)), dissolveHash(i + vec3(1, 1, 1)), f.x), f.y),
    f.z);
}`;

const CUT_GLSL = /* glsl */ `
  #include <clipping_planes_fragment>
  vec3 dissolveP = vDissolvePos * uDissolveScale;
  float dissolveN = 0.65 * dissolveNoise(dissolveP) + 0.35 * dissolveNoise(dissolveP * 2.7);
  float dissolveCut = mix(-${EDGE.toFixed(3)}, 1.0, uDissolve);
  if (dissolveN < dissolveCut) discard;
  float dissolveEdge = 1.0 - smoothstep(dissolveCut, dissolveCut + ${EDGE.toFixed(3)}, dissolveN);`;

/**
 * Gives every mesh under `root` its own material with a noise "burn" dissolve driven by
 * the returned `progress` (shared by the variant's meshes). Geometry and textures stay shared.
 */
export function makeVariant(root: THREE.Object3D): Variant {
  const progress = { value: 0 };
  root.traverse((node) => {
    if (!(node instanceof THREE.Mesh)) return;
    node.geometry.computeBoundingSphere();
    // ~4 noise cells across the mesh, whatever its native units.
    const scale = { value: 4 / (node.geometry.boundingSphere?.radius || 1) };
    node.material = [node.material].flat().map((source: THREE.Material) => {
      const material = source.clone();
      material.onBeforeCompile = (shader) => {
        Object.assign(shader.uniforms, { uDissolve: progress, uDissolveScale: scale, uDissolveEdge: { value: EDGE_COLOR } });
        shader.vertexShader = shader.vertexShader
          .replace("#include <common>", "#include <common>\nvarying vec3 vDissolvePos;")
          .replace("#include <begin_vertex>", "#include <begin_vertex>\nvDissolvePos = position;");
        shader.fragmentShader = shader.fragmentShader
          .replace("#include <common>", `#include <common>\n${NOISE_GLSL}`)
          .replace("#include <clipping_planes_fragment>", CUT_GLSL)
          .replace(
            "#include <emissivemap_fragment>",
            "#include <emissivemap_fragment>\ntotalEmissiveRadiance += uDissolveEdge * dissolveEdge;",
          );
      };
      material.customProgramCacheKey = () => "dissolve";
      return material;
    });
    if (node.material.length === 1) node.material = node.material[0];
  });
  return { root, progress };
}

/** Hides a variant until its first swap (call after shaders are compiled). */
export function stash({ root, progress }: Variant) {
  root.visible = false;
  progress.value = 1;
}

/** Ease into a fast spin, burn one model out and its partner in at peak speed, ease out. */
function swap(slot: SwapSlot) {
  const { morph, side } = slot;
  const [out, next] = slot.variants;
  slot.variants = [next, out];
  next.root.visible = true;

  const peak = SPIN_UP; // top speed: the swap moment
  return (
    gsap
      .timeline({
        onComplete: () => {
          out.root.visible = false;
          morph.rotation.y = 0; // two whole turns: same pose
        },
      })
      .to(morph.rotation, { y: side * TURN, duration: SPIN_UP, ease: "power2.in" }, 0)
      .to(morph.rotation, { y: side * TURN * 2, duration: SPIN_DOWN, ease: "power3.out" }, peak)
      // Lean, pinch and hop in with the spin-up, then drift back slower than the spin winds down.
      .to(morph.rotation, { x: TILT, duration: peak, ease: "sine.inOut" }, 0)
      .to(morph.rotation, { x: 0, duration: SETTLE, ease: "sine.inOut" }, peak)
      .to(morph.scale, { x: PINCH, y: PINCH, z: PINCH, duration: peak, ease: "sine.inOut" }, 0)
      .to(morph.scale, { x: 1, y: 1, z: 1, duration: SETTLE, ease: "sine.inOut" }, peak)
      .to(morph.position, { y: LIFT, duration: peak, ease: "sine.inOut" }, 0)
      .to(morph.position, { y: 0, duration: SETTLE, ease: "sine.inOut" }, peak)
      // Both burns straddle top speed, slightly staggered so the shapes overlap.
      .to(out.progress, { value: 1, duration: 0.45, ease: "sine.inOut" }, peak - 0.25)
      .to(next.progress, { value: 0, duration: 0.45, ease: "sine.inOut" }, peak - 0.15)
  );
}

/** Swaps one pair every INTERVAL, taking turns (never two at once). Returns a stop function. */
export function startSwaps({ pairs, isActive }: Options) {
  let call: gsap.core.Tween | undefined;
  let running: gsap.core.Timeline[] = [];
  let turn = 0;

  const schedule = (delay: number) => (call = gsap.delayedCall(delay, beat));
  const beat = () => {
    const pair = pairs[turn % pairs.length];
    if (!isActive()) return schedule(INTERVAL); // skip the beat, keep the rhythm and the turn
    if (pair.some((slot) => slot.held)) return schedule(RETRY);
    running = pair.map(swap);
    turn++;
    schedule(INTERVAL);
  };

  if (pairs.length) schedule(FIRST);

  return () => {
    call?.kill();
    running.forEach((timeline) => timeline.kill());
  };
}
