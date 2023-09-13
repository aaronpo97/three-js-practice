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
  mainMesh,
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

const top = tertiaryGroup.clone().translateY(1000);
const bottom = tertiaryGroup.clone().translateY(-1000);

const left = tertiaryGroup
  .clone()
  .translateX(2000)
  .rotateZ(Math.PI / 2);

const right = tertiaryGroup
  .clone()
  .translateX(-2000)
  .rotateZ(Math.PI / 2);

const main = new Group()
  .add(top)
  .add(bottom)
  .add(left)
  .add(right)
  .add(mainMesh);

export { primaryGroup, secondaryGroup, tertiaryGroup, main };
