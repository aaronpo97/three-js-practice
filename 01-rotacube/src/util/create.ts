import { Mesh, BoxGeometry, MeshBasicMaterial, Texture, Group } from "three";

/**
 * Creates a Three.js mesh with a box geometry and a basic material using the provided texture map.
 *
 * @param {Texture} map - The texture map to apply to the mesh material.
 * @returns {Mesh} - A Three.js mesh with the specified properties.
 */
export const createBlockMesh = (map: Texture): Mesh => {
  return new Mesh(new BoxGeometry(30, 30, 30), new MeshBasicMaterial({ map }));
};

/**
 * Creates a group of replicated objects based on the provided group and the number of replications.
 *
 * @param {Group} group - The group of objects to be replicated.
 * @param {number} replications - The number of times to replicate the provided group.
 * @returns {Group} - A new Three.js group containing the replicated objects.
 */
export const createReplicatedGroup = (
  group: Group,
  replications: number,
): Group => {
  const clonedGroup = new Group();

  for (let i = 0; i < replications; i++) {
    clonedGroup.add(group.clone());
  }

  return clonedGroup;
};
