import { Vector3 } from "three";
import { MOVEMENT_SPEED } from "../constants";

interface CalculateChildPositionArgs {
  position: Vector3;
  index: number;
  elapsedTime: number;
}

interface CalculateChildCoordinateArgs {
  elapsedTime: number;
  index: number;
}

/**
 * Calculates the value of a single coordinate of a child object based on its index and the elapsed
 * time.
 *
 * @param args The arguments for calculating the child position.
 * @param args.index - The index of the child object in the torus group.
 * @param args.elapsedTime - The elapsed time since the animation started.
 * @returns The calculated position of the child object.
 */
const calculateChildPosition = ({ elapsedTime, index }: CalculateChildCoordinateArgs) =>
  index % 2 === 0 ? Math.cos(elapsedTime) * MOVEMENT_SPEED : Math.sin(elapsedTime) * MOVEMENT_SPEED;

/**
 * Calculates the position of a single child object based on its index and the elapsed time.
 *
 * @param args The arguments for calculating the child positions.
 * @param args.position - The current position of the child object.
 * @param args.index - The index of the child object in the torus group.
 * @param args.elapsedTime - The elapsed time since the animation started.
 * @returns The calculated positions of all child objects.
 */
export default function calculateChildPositions({
  position,
  index,
  elapsedTime,
}: CalculateChildPositionArgs) {
  return {
    x: position.x + calculateChildPosition({ index, elapsedTime }),
    y: position.y + calculateChildPosition({ index, elapsedTime }),
    z: position.z + calculateChildPosition({ index, elapsedTime }),
  };
}
