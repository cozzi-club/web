import * as THREE from "three";
import { gsap } from "@/lib/gsap";

export type Draggable = {
  /** Object hit-tested against the pointer. */
  root: THREE.Object3D;
  /** Group moved/rotated by the drag, then sprung back to identity. */
  handle: THREE.Object3D;
  /** Called on grab (e.g. pause idle animations) and once the object is back at rest. */
  onGrab: () => void;
  onRest: () => void;
};

type Options = {
  /** Element that receives pointer events (the canvas itself stays click-through). */
  surface: HTMLElement;
  canvas: HTMLCanvasElement;
  camera: THREE.Camera;
  items: Draggable[];
  /** Scene units per CSS px = frameHeight / canvas height. */
  frameHeight: number;
  motion: boolean;
};

const RADIANS_PER_PX = 0.012;
const FLING = 0.08; // extra spin per px of release velocity
const TURN = Math.PI * 2;
const unwind = (angle: number) => angle - TURN * Math.round(angle / TURN);

/**
 * Grab-and-throw for 3D objects: drag moves and turns the object; on release it keeps
 * spinning briefly, then springs back to its resting pose.
 */
export function enableDrag({ surface, canvas, camera, items, frameHeight, motion }: Options) {
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const roots = items.map((item) => item.root);

  const owner = (object: THREE.Object3D | null) => {
    for (let node = object; node; node = node.parent) {
      const item = items.find((candidate) => candidate.root === node);
      if (item) return item;
    }
  };

  const shown = (object: THREE.Object3D) => {
    for (let node: THREE.Object3D | null = object; node; node = node.parent) if (!node.visible) return false;
    return true;
  };

  const itemAt = (clientX: number, clientY: number) => {
    const rect = canvas.getBoundingClientRect();
    ndc.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    if (Math.abs(ndc.x) > 1 || Math.abs(ndc.y) > 1) return;
    raycaster.setFromCamera(ndc, camera);
    // Raycasting ignores `visible`: skip hidden models (e.g. a swap partner waiting its turn).
    return owner(raycaster.intersectObjects(roots, true).find((hit) => shown(hit.object))?.object ?? null);
  };

  let drag: { item: Draggable; pointerId: number; x: number; y: number; vx: number; vy: number } | null = null;
  let hoverFrame = 0;

  const onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0) return;
    const item = itemAt(event.clientX, event.clientY);
    if (!item) return;

    event.preventDefault(); // no text selection while dragging
    surface.setPointerCapture(event.pointerId);
    surface.style.cursor = "grabbing";
    gsap.killTweensOf([item.handle.position, item.handle.rotation]);
    item.onGrab();
    drag = { item, pointerId: event.pointerId, x: event.clientX, y: event.clientY, vx: 0, vy: 0 };
  };

  const onPointerMove = (event: PointerEvent) => {
    if (drag?.pointerId === event.pointerId) {
      const dx = event.clientX - drag.x;
      const dy = event.clientY - drag.y;
      const units = frameHeight / canvas.getBoundingClientRect().height; // screen px → frame units
      const { position, rotation } = drag.item.handle;
      position.x += dx * units;
      position.y -= dy * units;
      rotation.y += dx * RADIANS_PER_PX;
      rotation.x += dy * RADIANS_PER_PX;
      Object.assign(drag, { x: event.clientX, y: event.clientY, vx: dx, vy: dy });
      return;
    }

    // Hover feedback, at most one hit test per frame.
    if (drag || hoverFrame) return;
    const { clientX, clientY } = event;
    hoverFrame = requestAnimationFrame(() => {
      hoverFrame = 0;
      surface.style.cursor = itemAt(clientX, clientY) ? "grab" : "";
    });
  };

  const onPointerUp = (event: PointerEvent) => {
    if (drag?.pointerId !== event.pointerId) return;
    const { item, vx, vy } = drag;
    const { position, rotation } = item.handle;
    drag = null;
    surface.style.cursor = "grab";

    const spring = motion ? "elastic.out(1, 0.55)" : "power2.out";
    gsap
      .timeline({ onComplete: item.onRest })
      .to(rotation, { y: `+=${vx * FLING}`, x: `+=${vy * FLING}`, duration: 0.45, ease: "power2.out" })
      .add(() => rotation.set(unwind(rotation.x), unwind(rotation.y), unwind(rotation.z)))
      .to(rotation, { x: 0, y: 0, z: 0, duration: 1.5, ease: spring })
      .to(position, { x: 0, y: 0, z: 0, duration: 1.3, ease: spring }, 0.15);
  };

  // Touch: block page scrolling only when the finger lands on an object.
  const onTouchStart = (event: TouchEvent) => {
    const touch = event.touches[0];
    if (touch && itemAt(touch.clientX, touch.clientY)) event.preventDefault();
  };

  surface.addEventListener("pointerdown", onPointerDown);
  surface.addEventListener("pointermove", onPointerMove);
  surface.addEventListener("pointerup", onPointerUp);
  surface.addEventListener("pointercancel", onPointerUp);
  surface.addEventListener("touchstart", onTouchStart, { passive: false });

  return () => {
    cancelAnimationFrame(hoverFrame);
    surface.removeEventListener("pointerdown", onPointerDown);
    surface.removeEventListener("pointermove", onPointerMove);
    surface.removeEventListener("pointerup", onPointerUp);
    surface.removeEventListener("pointercancel", onPointerUp);
    surface.removeEventListener("touchstart", onTouchStart);
    surface.style.cursor = "";
    for (const { handle } of items) gsap.killTweensOf([handle.position, handle.rotation]);
  };
}
