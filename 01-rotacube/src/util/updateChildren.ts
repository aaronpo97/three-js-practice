import { Object3D } from "three";
import {
  PRIMARY_GROUP_ANGLE_INCREMENT,
  PRIMARY_GROUP_RADIUS,
  PRIMARY_Y_FACTOR,
  SECONDARY_GROUP_ANGLE_INCREMENT,
  SECONDARY_GROUP_RADIUS,
  SECONDARY_Y_FACTOR,
  TERTIARY_GROUP_ANGLE_INCREMENT,
  TERTIARY_GROUP_RADIUS,
  TERTIARY_Y_FACTOR,
} from "../constants";
import { clock } from "../objects";
import calculatePositions from "./calculatePositions";

type UpdateGroupChildrenArgs = {
  child: Object3D;
  index: number;
  rotationSpeed: number;
  reverse?: boolean;
};

const updatePrimaryGroupChildren = ({
  child,
  index,
  rotationSpeed,
  reverse = false,
}: UpdateGroupChildrenArgs) => {
  const elapsedTime = clock.getElapsedTime();
  const angleIncrement = index * PRIMARY_GROUP_ANGLE_INCREMENT;
  const PRIMARY_ROTATION_SPEED = rotationSpeed * 1.5;

  const { x, y, z } = calculatePositions({
    angleIncrement,
    elapsedTime,
    index,
    reverse,
    radius: PRIMARY_GROUP_RADIUS,
    rotationSpeed: PRIMARY_ROTATION_SPEED,
    yFactor: PRIMARY_Y_FACTOR,
  });

  child.position.set(x, y, z);
};

const updateSecondaryGroupChildren = ({
  child,
  index,
  rotationSpeed,
  reverse = false,
}: UpdateGroupChildrenArgs) => {
  const elapsedTime = clock.getElapsedTime();

  const angleIncrement = index * SECONDARY_GROUP_ANGLE_INCREMENT;

  const SECONDARY_ROTATION_SPEED = rotationSpeed * 1.2;

  const { x, y, z } = calculatePositions({
    angleIncrement,
    elapsedTime,
    reverse,
    index,
    radius: SECONDARY_GROUP_RADIUS,
    rotationSpeed: SECONDARY_ROTATION_SPEED,
    yFactor: SECONDARY_Y_FACTOR,
  });

  child.position.set(x, y, z);

  child.children.forEach((child, index) =>
    updatePrimaryGroupChildren({
      child,
      index,
      reverse,
      rotationSpeed,
    }),
  );
};

const updateTertiaryGroupChildren = ({
  child,
  index,
  rotationSpeed,
  reverse = false,
}: UpdateGroupChildrenArgs) => {
  const elapsedTime = clock.getElapsedTime();
  const angleIncrement = index * TERTIARY_GROUP_ANGLE_INCREMENT;

  const TERTIARY_ROTATION_SPEED = rotationSpeed;

  const { x, y, z } = calculatePositions({
    angleIncrement,
    elapsedTime,
    reverse,
    index,
    radius: TERTIARY_GROUP_RADIUS,
    rotationSpeed: TERTIARY_ROTATION_SPEED,
    yFactor: TERTIARY_Y_FACTOR,
  });

  child.position.set(x, y, z);
  child.children.forEach((child, index) =>
    updateSecondaryGroupChildren({
      child,
      index,
      reverse,
      rotationSpeed,
    }),
  );
};

export {
  updatePrimaryGroupChildren,
  updateSecondaryGroupChildren,
  updateTertiaryGroupChildren,
};
