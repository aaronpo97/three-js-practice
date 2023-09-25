import { MAX_DISTANCE } from "../constants";
import calculateRandomCoordinates from "./calculateRandomCoordinates";
import { Object3D } from "three";

const setInitialChildPosition = (child: Object3D) => {
  const factor = MAX_DISTANCE * 1.5;
  const position = calculateRandomCoordinates(factor);
  const rotation = calculateRandomCoordinates(factor);

  child.position.set(position.x, position.y, position.z);
  child.rotation.set(rotation.x, rotation.y, rotation.z);
};

export default setInitialChildPosition;
