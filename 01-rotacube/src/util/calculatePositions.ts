type CalcXPositionArgs = {
  elapsedTime: number;
  radius: number;
  rotationSpeed: number;
  reverse: boolean;
  angleIncrement: number;
};
type CalcYPositionArgs = {
  elapsedTime: number;
  rotationSpeed: number;
  yFactor: number;
  index: number;
};

type CalcZPositionArgs = CalcXPositionArgs;

export const calculateXPosition = ({
  elapsedTime,
  radius,
  rotationSpeed,
  reverse,
  angleIncrement,
}: CalcXPositionArgs) => {
  return reverse
    ? radius * Math.cos(angleIncrement + elapsedTime * rotationSpeed)
    : radius * Math.sin(angleIncrement + elapsedTime * rotationSpeed);
};

export const calculateYPosition = ({
  elapsedTime,
  rotationSpeed,
  yFactor,
  index,
}: CalcYPositionArgs) => {
  return index % 2
    ? Math.sin(elapsedTime * rotationSpeed) * yFactor
    : Math.cos(elapsedTime * rotationSpeed) * yFactor;
};

export const calculateZPosition = ({
  elapsedTime,
  radius,
  rotationSpeed,
  reverse,
  angleIncrement,
}: CalcZPositionArgs) => {
  return reverse
    ? radius * Math.sin(angleIncrement + elapsedTime * rotationSpeed)
    : radius * Math.cos(angleIncrement + elapsedTime * rotationSpeed);
};
