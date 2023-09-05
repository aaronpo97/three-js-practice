import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CAMERA_SETTINGS, SIZES } from "./constants";
import {
  diamondMesh,
  emeraldMesh,
  goldMesh,
  ironMesh,
  lapisMesh,
  redstoneMesh,
  coalMesh,
  copperMesh,
} from "./meshes";
import { Group, PerspectiveCamera, Scene, WebGLRenderer } from "three";

const canvas = document.createElement("canvas");
canvas.classList.add("web-gl");
document.body.appendChild(canvas);

const base = new Group()
  .add(diamondMesh)
  .add(emeraldMesh)
  .add(goldMesh)
  .add(ironMesh)
  .add(lapisMesh)
  .add(redstoneMesh)
  .add(coalMesh)
  .add(copperMesh);

const baseRadius = 5;

base.children.forEach((blockMesh, i) => {
  const angleIncrement = (2 * Math.PI) / base.children.length;
  const angle = i * angleIncrement;
  const x = baseRadius * Math.cos(angle);
  const y = baseRadius * Math.sin(angle);
  const z = 0;
  blockMesh.position.set(x, y, z);
});

const metaGroup = new Group()
  .add(base.clone())
  .add(base.clone())
  .add(base.clone())
  .add(base.clone());

const metaGroupRadius = 10;

metaGroup.children.forEach((group, i) => {
  const angleIncrement = (2 * Math.PI) / metaGroup.children.length;
  const angle = i * angleIncrement;
  const x = metaGroupRadius * Math.cos(angle);
  const y = metaGroupRadius * Math.sin(angle);
  const z = 0;
  group.position.set(x, y, z);
});

const camera = new PerspectiveCamera(
  CAMERA_SETTINGS.fov,
  CAMERA_SETTINGS.aspect,
  CAMERA_SETTINGS.near,
  CAMERA_SETTINGS.far,
);
camera.position.z = 15;

const scene = new Scene().add(metaGroup);

const renderer = new WebGLRenderer({ canvas });
renderer.setSize(SIZES.width, SIZES.height);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// const clock = new Clock();
const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();

window.addEventListener("resize", () => {
  // Update sizes
  SIZES.width = window.innerWidth;
  SIZES.height = window.innerHeight;

  camera.aspect = SIZES.width / SIZES.height;
  camera.updateProjectionMatrix();

  renderer.setSize(SIZES.width, SIZES.height);
});

window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
    return;
  }
  document.exitFullscreen();
});
