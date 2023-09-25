import { clock, renderer, scene, camera, controls } from "../objects";
import { torusGroup } from "../objects/mesh";
import calculateChildPositions from "./calculateChildPositions";
import { calculateChildRotation } from "./calculateChildRotation";

/**
 * Animates the scene by updating the positions and rotations of the child objects in the torus
 * group.
 *
 * - Updates the positions of the child objects in the torus group.
 * - Updates the rotations of the child objects in the torus group.
 * - Renders the scene.
 * - Updates the controls.
 * - Requests the next animation frame.
 */
export default function animate() {
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

  renderer.render(scene, camera);
  controls.update();

  requestAnimationFrame(animate);
}
