import { Euler } from "three";
import { ROTATION_SPEED } from "../constants";

/**
 * Calculates the rotation of a single child object based on its current rotation.
 *
 * @param rotation The current rotation of the child object.
 * @returns The calculated rotation of the child object.
 */
export const calculateChildRotation = (rotation: Euler) => {
  return {
    x: rotation.x + ROTATION_SPEED,
    y: rotation.y + ROTATION_SPEED,
    z: rotation.z + ROTATION_SPEED,
  };
};
