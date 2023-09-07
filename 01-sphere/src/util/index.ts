import { Mesh, BoxGeometry, MeshBasicMaterial, Texture } from "three";

export const createBlockMesh = (map: Texture) =>
  new Mesh(new BoxGeometry(30, 30, 30), new MeshBasicMaterial({ map }));
