export const SIZES = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export const CAMERA_SETTINGS = {
  fov: 100,
  aspect: SIZES.width / SIZES.height,
  near: 0.01,
  far: 10500,
};

export const MAX_DISTANCE = 50;
export const ROTATION_SPEED = 0.0005;
export const MOVEMENT_SPEED = 0.005;
