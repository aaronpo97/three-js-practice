import { SIZES } from "../constants";
import { camera, canvas, renderer } from "../objects";

export const onResize = (): void => {
  // Update sizes
  SIZES.width = window.innerWidth;
  SIZES.height = window.innerHeight;

  camera.aspect = SIZES.width / SIZES.height;
  camera.updateProjectionMatrix();

  renderer.setSize(SIZES.width, SIZES.height);
};

export const onDoubleClick = (): void => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
    return;
  }
  document.exitFullscreen();
};
