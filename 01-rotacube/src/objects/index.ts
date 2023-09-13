import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { CAMERA_SETTINGS, SIZES } from "../constants";

import GUI from "lil-gui";

/**
 * Represents a 3D perspective camera used for viewing the scene.
 *
 * Sets the following properties:
 *
 * - `fov` - The field of view in degrees.
 * - `aspect` - The aspect ratio (width / height).
 * - `near` - The near clipping plane.
 * - `far` - The far clipping plane.
 *
 * The camera is positioned at `(0, 0, 1000)`.
 *
 * @see https://threejs.org/docs/#api/en/cameras/PerspectiveCamera
 */
const camera = new PerspectiveCamera(
  CAMERA_SETTINGS.fov,
  CAMERA_SETTINGS.aspect,
  CAMERA_SETTINGS.near,
  CAMERA_SETTINGS.far,
);
camera.position.set(0, 0, 3000);

/**
 * Represents a 3D scene where objects and entities are placed for rendering.
 *
 * @see https://threejs.org/docs/#api/en/scenes/Scene
 */
const scene = new Scene();

/**
 * Represents a canvas element used for WebGL rendering.
 *
 * Adds the class name `web-gl` to the canvas to allow for custom styling with
 * CSS.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement
 */
const canvas = document.createElement("canvas");
canvas.classList.add("web-gl");

/**
 * Represents a WebGL renderer responsible for rendering the scenes onto the
 * canvas.
 *
 * Sets the size of the renderer to the `SIZES` constant.
 *
 * @see https://threejs.org/docs/#api/en/renderers/WebGLRenderer
 */
const renderer = new WebGLRenderer({ canvas });

renderer.setSize(SIZES.width, SIZES.height);

/**
 * Represents a 3JS clock used for timing animations.
 *
 * @see https://threejs.org/docs/#api/en/core/Clock
 */
const clock = new Clock();

/**
 * Represents a graphical user interface (GUI) instance for a floating panel of
 * controls. *
 *
 * @see https://lil-gui.georgealways.com/
 */
const gui = new GUI();

export { canvas, scene, camera, renderer, clock, gui };
