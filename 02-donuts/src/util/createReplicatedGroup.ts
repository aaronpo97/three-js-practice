import { Group, Object3D } from "three";
import setInitialChildPosition from "./setInitialChildPosition";
import type PositiveInteger from "../types/PositiveInteger";

/**
 * Creates a group of replicated objects. The positions of each object are randomized.
 *
 * @param object An object of type Object3D to be replicated.
 * @param replications The number of times the object should be replicated.
 * @returns A group containing the replicated objects.
 */
const createReplicatedGroup = <T extends number>(
  object: Object3D,
  replications: PositiveInteger<T>,
): Group => {
  const clonedGroup = new Group();
  for (let i = 0; i < replications; i++) {
    clonedGroup.add(object.clone());
  }

  clonedGroup.children.forEach(setInitialChildPosition);
  return clonedGroup;
};

export default createReplicatedGroup;
