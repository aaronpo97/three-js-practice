import { clock, camera, renderer, scene, controls } from "./objects";
import { Euler, Vector3 } from "three";
import { MOVEMENT_SPEED, ROTATION_SPEED } from "./constants";
import { torusGroup } from "./objects/mesh";

/**
 * Animates the scene by updating the positions and rotations of the child objects in the torus
 * group.
 */ 0;
export function animate() {
  /** Arguments for calculating the position of a child object. */
  interface CalculateChildPositionsArgs {
    /** The position of the child object. */
    position: Vector3;
    /** The index of the child object in the torus group. */
    index: number;
    /** The elapsed time since the animation started. */
    elapsedTime: number;
  }

  /** Arguments for calculating the position of a single child object. */
  interface CalculateChildPositionArgs {
    /** The index of the child object in the torus group. */
    index: number;
    /** The elapsed time since the animation started. */
    elapsedTime: number;
  }

  /**
   * Calculates the position of a single child object based on its index and the elapsed time.
   *
   * @param args The arguments for calculating the child position.
   * @param args.index - The index of the child object in the torus group.
   * @param args.elapsedTime - The elapsed time since the animation started.
   * @returns The calculated position of the child object.
   */
  const calculateChildPosition = ({ elapsedTime, index }: CalculateChildPositionArgs) =>
    index % 2 === 0
      ? Math.cos(elapsedTime) * MOVEMENT_SPEED
      : Math.sin(elapsedTime) * MOVEMENT_SPEED;

  /**
   * Calculates the positions of all child objects in the torus group based on their current
   * positions, indices, and the elapsed time.
   *
   * @param args - The arguments for calculating the child positions.
   * @param args.position - The position of the child object.
   * @param args.index - The index of the child object in the torus group.
   * @param args.elapsedTime - The elapsed time since the animation started.
   * @returns The calculated positions of all child objects.
   */
  const calculateChildPositions = ({
    position,
    index,
    elapsedTime,
  }: CalculateChildPositionsArgs) => ({
    x: position.x + calculateChildPosition({ index, elapsedTime }),
    y: position.y + calculateChildPosition({ index, elapsedTime }),
    z: position.z + calculateChildPosition({ index, elapsedTime }),
  });

  /**
   * Calculates the rotation of a single child object based on its current rotation.
   *
   * @param rotation The current rotation of the child object.
   * @returns The calculated rotation of the child object.
   */
  const calculateChildRotation = (rotation: Euler) => {
    return {
      x: rotation.x + ROTATION_SPEED,
      y: rotation.y + ROTATION_SPEED,
      z: rotation.z + ROTATION_SPEED,
    };
  };

  /**
   * Update the positions and rotations of all child objects in the torus group.
   *
   * The positions and rotations are updated based on the current positions and rotations of the
   * child objects, their indices, and the elapsed time.
   */
  torusGroup.children.forEach((child, index) => {
    const elapsedTime = clock.getElapsedTime();

    const position = calculateChildPositions({
      position: child.position,
      index,
      elapsedTime,
    });

    const rotation = calculateChildRotation(child.rotation);

    child.rotation.set(rotation.x, rotation.y, rotation.z);
    child.position.set(position.x, position.y, position.z);
  });

  /** Render the scene and update the controls. */
  renderer.render(scene, camera);
  controls.update();

  /* Request the next animation frame. */
  requestAnimationFrame(animate);
}
