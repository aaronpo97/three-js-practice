import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { CAMERA_SETTINGS, SIZES } from "../constants";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import GUI from "lil-gui";

const camera = new PerspectiveCamera(
  CAMERA_SETTINGS.fov,
  CAMERA_SETTINGS.aspect,
  CAMERA_SETTINGS.near,
  CAMERA_SETTINGS.far,
);
camera.position.z = 1000;

const scene = new Scene();

const canvas = document.createElement("canvas");
canvas.classList.add("web-gl");

const renderer = new WebGLRenderer({ canvas });
renderer.setSize(SIZES.width, SIZES.height);
const controls = new TrackballControls(camera, canvas);

const clock = new Clock();

const gui = new GUI();

export { canvas, scene, camera, renderer, controls, clock, gui };
