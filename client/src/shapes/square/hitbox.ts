import type { Square } from ".";
import { rectHitbox } from "@shape/rect/hitbox";
import type { Coordinate } from "@shape/types";

/**
 * @param point - the point to check if it is in the square
 * @returns a function that checks if the point is in the square
*/
export const squareHitbox = (square: Square) => {
  const isInRect = rectHitbox({
    at: square.at,
    width: square.size,
    height: square.size,
  });
  return (point: Coordinate) => isInRect(point);
}