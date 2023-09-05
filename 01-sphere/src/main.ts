import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  CAMERA_SETTINGS,
  PRIMARY_GROUP_RADIUS,
  ROTATION_SPEED,
  SECONDARY_GROUP_RADIUS,
  SIZES,
  TERTIARY_GROUP_RADIUS,
} from "./constants";
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

import {
  Group,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  Clock,
  Object3D,
} from "three";

const canvas = document.createElement("canvas");
canvas.classList.add("web-gl");
document.body.appendChild(canvas);

const primaryGroup = new Group()
  .add(diamondMesh)
  .add(emeraldMesh)
  .add(goldMesh)
  .add(ironMesh)
  .add(lapisMesh)
  .add(redstoneMesh)
  .add(coalMesh)
  .add(copperMesh);

const secondaryGroup = new Group()
  .add(primaryGroup.clone())
  .add(primaryGroup.clone())
  .add(primaryGroup.clone())
  .add(primaryGroup.clone())
  .add(primaryGroup.clone())
  .add(primaryGroup.clone())
  .add(primaryGroup.clone())
  .add(primaryGroup.clone())
  .add(primaryGroup.clone())
  .add(primaryGroup.clone())
  .add(primaryGroup.clone())
  .add(primaryGroup.clone())
  .add(primaryGroup.clone())
  .add(primaryGroup.clone())
  .add(primaryGroup.clone())
  .add(primaryGroup.clone());

const tertiaryGroup = new Group()
  .add(secondaryGroup.clone())
  .add(secondaryGroup.clone())
  .add(secondaryGroup.clone())
  .add(secondaryGroup.clone())
  .add(secondaryGroup.clone())
  .add(secondaryGroup.clone())
  .add(secondaryGroup.clone())
  .add(secondaryGroup.clone());

const camera = new PerspectiveCamera(
  CAMERA_SETTINGS.fov,
  CAMERA_SETTINGS.aspect,
  CAMERA_SETTINGS.near,
  CAMERA_SETTINGS.far,
);
camera.position.z = 800;

const renderer = new WebGLRenderer({ canvas });
renderer.setSize(SIZES.width, SIZES.height);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const scene = new Scene();
scene.add(tertiaryGroup);
scene.add(camera);

const TERTIARY_Z_FACTOR = 200;
const SECONDARY_Z_FACTOR = 400;
const PRIMARY_Z_FACTOR = 100;

const clock = new Clock();

const TERTIARY_GROUP_ANGLE_INCREMENT =
  (2 * Math.PI) / tertiaryGroup.children.length;
const SECONDARY_GROUP_ANGLE_INCREMENT =
  (2 * Math.PI) / secondaryGroup.children.length;
const PRIMARY_GROUP_ANGLE_INCREMENT =
  (2 * Math.PI) / primaryGroup.children.length;

const updatePrimaryGroupChildren = (child: Object3D, index: number) => {
  const elapsedTime = clock.getElapsedTime();
  const angle = index * PRIMARY_GROUP_ANGLE_INCREMENT;

  child.position.set(
    PRIMARY_GROUP_RADIUS * Math.sin(angle + elapsedTime * ROTATION_SPEED),
    PRIMARY_GROUP_RADIUS * Math.cos(angle + elapsedTime * ROTATION_SPEED),
    index % 2
      ? Math.sin(elapsedTime * ROTATION_SPEED) * PRIMARY_Z_FACTOR
      : Math.cos(elapsedTime * ROTATION_SPEED) * PRIMARY_Z_FACTOR,
  );
};

const updateSecondaryGroupChildren = (child: Object3D, index: number) => {
  const elapsedTime = clock.getElapsedTime();
  const angle = index * SECONDARY_GROUP_ANGLE_INCREMENT;

  child.position.set(
    SECONDARY_GROUP_RADIUS * Math.sin(angle + elapsedTime * ROTATION_SPEED),
    SECONDARY_GROUP_RADIUS * Math.cos(angle + elapsedTime * ROTATION_SPEED),
    index % 2
      ? Math.sin(elapsedTime * ROTATION_SPEED) * SECONDARY_Z_FACTOR
      : Math.cos(elapsedTime * ROTATION_SPEED) * SECONDARY_Z_FACTOR,
  );

  child.children.forEach(updatePrimaryGroupChildren);
};

const updateTertiaryGroupChildren = (child: Object3D, index: number) => {
  const elapsedTime = clock.getElapsedTime();
  const angle = index * TERTIARY_GROUP_ANGLE_INCREMENT;

  child.position.set(
    TERTIARY_GROUP_RADIUS * Math.sin(angle + elapsedTime * ROTATION_SPEED),
    TERTIARY_GROUP_RADIUS * Math.cos(angle + elapsedTime * ROTATION_SPEED),
    index % 2
      ? Math.sin(elapsedTime * ROTATION_SPEED) * TERTIARY_Z_FACTOR
      : Math.cos(elapsedTime * ROTATION_SPEED) * TERTIARY_Z_FACTOR,
  );

  child.children.forEach(updateSecondaryGroupChildren);
};

const tick = () => {
  tertiaryGroup.children.forEach(updateTertiaryGroupChildren);
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
