import { SIZES } from "../constants";
import { camera, canvas, renderer } from "../objects";

/**
 * Updates the sizes of the canvas, camera, and renderer when the window is resized.
 *
 * Sets the following properties:
 *
 * - `width` - The width of the window object.
 * - `height` - The height of the window object.
 * - `aspect` - The aspect ratio (width / height) of the camera.
 * - `updateProjectionMatrix()` - Updates the camera's projection matrix.
 */
export const onResize = (): void => {
  // Update sizes
  SIZES.width = window.innerWidth;
  SIZES.height = window.innerHeight;

  camera.aspect = SIZES.width / SIZES.height;
  camera.updateProjectionMatrix();

  renderer.setSize(SIZES.width, SIZES.height);
};

/**
 * Handles the double click event on the canvas element.
 *
 * - If the document is not in fullscreen mode, requests fullscreen mode.
 * - If the document is already in fullscreen mode, exits fullscreen mode.
 */
export const onDoubleClick = (): void => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
    return;
  }
  document.exitFullscreen();
};
