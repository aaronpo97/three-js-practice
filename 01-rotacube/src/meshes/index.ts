import { Mesh, BoxGeometry, MeshBasicMaterial } from "three";
import {
  copperTexture,
  coalTexture,
  ironTexture,
  goldTexture,
  emeraldTexture,
  diamondTexture,
  lapisTexture,
  redstoneTexture,
} from "../textures";
import { createBlockMesh } from "../util/create";

export const copperMesh = createBlockMesh(copperTexture);
export const coalMesh = createBlockMesh(coalTexture);
export const ironMesh = createBlockMesh(ironTexture);
export const goldMesh = createBlockMesh(goldTexture);
export const emeraldMesh = createBlockMesh(emeraldTexture);
export const diamondMesh = createBlockMesh(diamondTexture);
export const lapisMesh = createBlockMesh(lapisTexture);
export const redstoneMesh = createBlockMesh(redstoneTexture);

export const mainMesh = new Mesh(
  new BoxGeometry(300, 300, 300),
  new MeshBasicMaterial({ map: coalTexture }),
);
