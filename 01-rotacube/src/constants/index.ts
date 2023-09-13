import { tertiaryGroup, secondaryGroup, primaryGroup } from "../groups";

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

export const PRIMARY_GROUP_RADIUS = 50;
export const SECONDARY_GROUP_RADIUS = 200;
export const TERTIARY_GROUP_RADIUS = 1000;

export const TERTIARY_Y_FACTOR = 100;
export const SECONDARY_Y_FACTOR = 200;
export const PRIMARY_Y_FACTOR = 100;

export const TERTIARY_GROUP_ANGLE_INCREMENT =
  (2 * Math.PI) / tertiaryGroup.children.length;
export const SECONDARY_GROUP_ANGLE_INCREMENT =
  (2 * Math.PI) / secondaryGroup.children.length;
export const PRIMARY_GROUP_ANGLE_INCREMENT =
  (2 * Math.PI) / primaryGroup.children.length;
