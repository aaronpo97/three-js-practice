import "./style.css";
import { TrackballControls } from "three/addons/controls/TrackballControls.js";
import {
  CAMERA_SETTINGS,
  PRIMARY_GROUP_RADIUS,
  SECONDARY_GROUP_RADIUS,
  SIZES,
  TERTIARY_GROUP_RADIUS,
} from "./constants";

import { debounce } from "lodash";

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
  Mesh,
  BoxGeometry,
  MeshBasicMaterial,
} from "three";

import { GUI } from "lil-gui";
import { coalTexture } from "./textures";

const gui = new GUI();

let ROTATION_SPEED = 0.5;

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

const mainMesh = new Mesh(
  new BoxGeometry(300, 300, 300),
  new MeshBasicMaterial({ map: coalTexture }),
);

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

  // Translate the child along the x and y axis to create a circular motion.
  const x =
    PRIMARY_GROUP_RADIUS *
    Math.sin(angle + elapsedTime * PRIMARY_ROTATION_SPEED * 5);
  const y =
    PRIMARY_GROUP_RADIUS *
    Math.cos(angle + elapsedTime * PRIMARY_ROTATION_SPEED * 5);

  // Go in a back and forth motion along the z axis, each child alternating between sin and cos.
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

gui
  .add({ rotationSpeed: ROTATION_SPEED }, "rotationSpeed")
  .min(0)
  .max(1)
  .step(0.01)
  .onChange(
    debounce((value: number) => {
      ROTATION_SPEED = value;
    }, 50),
  )
  .name("Rotation Speed");

gui
  .add(camera, "fov")
  .min(0)
  .max(180)
  .step(1)
  .name("FOV")
  .onChange((value: number) => {
    camera.fov = value;
    camera.updateProjectionMatrix();
  });

gui
  .add(tertiaryGroup.position, "x")
  .min(-1000)
  .max(1000)
  .step(1)
  .name("X Axis")
  .onChange((value: number) => {
    tertiaryGroup.position.x = value;
    mainMesh.position.x = value;
  });

gui
  .add(tertiaryGroup.position, "y")
  .min(-1000)
  .max(1000)
  .step(1)
  .name("Y Axis")
  .onChange((value: number) => {
    tertiaryGroup.position.y = value;
    mainMesh.position.y = value;
  });

gui
  .add(tertiaryGroup.position, "z")
  .min(-1000)
  .max(1000)
  .step(1)
  .name("Z Axis")
  .onChange((value: number) => {
    tertiaryGroup.position.z = value;
    mainMesh.position.z = value;
  });

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
