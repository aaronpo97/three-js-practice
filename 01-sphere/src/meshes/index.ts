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
import { createBlockMesh } from "../util";

export const copperMesh = createBlockMesh(copperTexture);
export const coalMesh = createBlockMesh(coalTexture);
export const ironMesh = createBlockMesh(ironTexture);
export const goldMesh = createBlockMesh(goldTexture);
export const emeraldMesh = createBlockMesh(emeraldTexture);
export const diamondMesh = createBlockMesh(diamondTexture);
export const lapisMesh = createBlockMesh(lapisTexture);
export const redstoneMesh = createBlockMesh(redstoneTexture);
