import { Mesh, BoxGeometry, MeshBasicMaterial, Texture } from "three";

export const createBlockMesh = (map: Texture) =>
  new Mesh(new BoxGeometry(2, 2, 2), new MeshBasicMaterial({ map }));
