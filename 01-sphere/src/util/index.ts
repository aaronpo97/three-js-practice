import { Mesh, BoxGeometry, MeshBasicMaterial, Texture } from "three";

export const createBlockMesh = (map: Texture) =>
  new Mesh(new BoxGeometry(10, 10, 10), new MeshBasicMaterial({ map }));
