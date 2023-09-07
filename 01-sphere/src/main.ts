import "./style.css";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";
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
  Vector3,
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
  .add(primaryGroup.clone());

const tertiaryGroup = new Group()
  .add(secondaryGroup.clone())
  .add(secondaryGroup.clone())
  .add(secondaryGroup.clone())
  .add(secondaryGroup.clone())
  .add(secondaryGroup.clone())
  .add(secondaryGroup.clone())
  .add(secondaryGroup.clone())
  .add(secondaryGroup.clone())
  .add(secondaryGroup.clone())
  .rotateX(Math.PI / 2);

const camera = new PerspectiveCamera(
  CAMERA_SETTINGS.fov,
  CAMERA_SETTINGS.aspect,
  CAMERA_SETTINGS.near,
  CAMERA_SETTINGS.far,
);
camera.position.z = 1500;

const renderer = new WebGLRenderer({ canvas });
renderer.setSize(SIZES.width, SIZES.height);

const controls = new TrackballControls(camera, canvas);

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
  const PRIMARY_ROTATION_SPEED = ROTATION_SPEED * 1.5;

  const elapsedTime = clock.getElapsedTime();
  const angle = index * PRIMARY_GROUP_ANGLE_INCREMENT;

  const x =
    PRIMARY_GROUP_RADIUS *
    Math.sin(angle + elapsedTime * PRIMARY_ROTATION_SPEED * 5);
  const y =
    PRIMARY_GROUP_RADIUS *
    Math.cos(angle + elapsedTime * PRIMARY_ROTATION_SPEED * 5);

  const z =
    index % 2
      ? Math.sin(elapsedTime * PRIMARY_ROTATION_SPEED) * PRIMARY_Z_FACTOR
      : Math.cos(elapsedTime * PRIMARY_ROTATION_SPEED) * PRIMARY_Z_FACTOR;
  child.position.set(x, y, z);
};

const updateSecondaryGroupChildren = (child: Object3D, index: number) => {
  const SECONDARY_ROTATION_SPEED = ROTATION_SPEED * 2;
  const elapsedTime = clock.getElapsedTime();
  const angle = index * SECONDARY_GROUP_ANGLE_INCREMENT;

  const x =
    SECONDARY_GROUP_RADIUS *
    Math.sin(angle + elapsedTime * SECONDARY_ROTATION_SPEED);
  const y =
    SECONDARY_GROUP_RADIUS *
    Math.cos(angle + elapsedTime * SECONDARY_ROTATION_SPEED);
  const z =
    index % 2
      ? Math.sin(elapsedTime * SECONDARY_ROTATION_SPEED) * SECONDARY_Z_FACTOR
      : Math.cos(elapsedTime * SECONDARY_ROTATION_SPEED) * SECONDARY_Z_FACTOR;

  child.position.set(x, y, z);

  child.children.forEach(updatePrimaryGroupChildren);
};

const updateTertiaryGroupChildren = (child: Object3D, index: number) => {
  const elapsedTime = clock.getElapsedTime();
  const angle = index * TERTIARY_GROUP_ANGLE_INCREMENT;

  const TERTIARY_ROTATION_SPEED = ROTATION_SPEED * 0.8;

  const x =
    TERTIARY_GROUP_RADIUS *
    Math.sin(angle + elapsedTime * TERTIARY_ROTATION_SPEED);
  const y =
    TERTIARY_GROUP_RADIUS *
    Math.cos(angle + elapsedTime * TERTIARY_ROTATION_SPEED);
  const z =
    index % 2
      ? Math.sin(elapsedTime * TERTIARY_ROTATION_SPEED) * TERTIARY_Z_FACTOR
      : Math.cos(elapsedTime * TERTIARY_ROTATION_SPEED) * TERTIARY_Z_FACTOR;

  child.position.set(x, y, z);

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
