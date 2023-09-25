/**
 * Calculates a random coordinate based on a given factor.
 *
 * @param factor The factor to use in the calculation.
 * @returns A random coordinate.
 */
const calculateRandomCoordinate = (factor: number) => Math.random() * factor - factor / 2;

/**
 * Calculates random coordinates based on a given factor.
 *
 * @param factor - The factor used to calculate the random coordinates.
 * @returns An object containing the calculated x, y, and z coordinates.
 */
const calculateRandomCoordinates = (factor: number) => {
  return {
    x: calculateRandomCoordinate(factor),
    y: calculateRandomCoordinate(factor),
    z: calculateRandomCoordinate(factor),
  };
};

export default calculateRandomCoordinates;
