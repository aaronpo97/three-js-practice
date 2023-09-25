import { TorusGeometry, MeshNormalMaterial, Mesh } from "three";
import createReplicatedGroup from "../util/createReplicatedGroup";

const torusGeometry = new TorusGeometry(1, 0.7, 40);
const torusMaterial = new MeshNormalMaterial({});

export const torus = new Mesh(torusGeometry, torusMaterial);
export const torusGroup = createReplicatedGroup(torus, 600);
