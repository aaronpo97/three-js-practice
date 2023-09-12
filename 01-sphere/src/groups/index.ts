import { Group } from "three";
import {
  diamondMesh,
  emeraldMesh,
  goldMesh,
  ironMesh,
  lapisMesh,
  redstoneMesh,
  coalMesh,
  copperMesh,
} from "../meshes";

import { createReplicatedGroup } from "../util/create";

const primaryGroup = new Group()
  .add(diamondMesh)
  .add(emeraldMesh)
  .add(goldMesh)
  .add(ironMesh)
  .add(lapisMesh)
  .add(redstoneMesh)
  .add(coalMesh)
  .add(copperMesh);

const secondaryGroup = createReplicatedGroup(primaryGroup, 10);
const tertiaryGroup = createReplicatedGroup(secondaryGroup, 12);

export { primaryGroup, secondaryGroup, tertiaryGroup };
