import { Coordinate } from '@magic/canvas/types';

import { ref } from 'vue';

type ActiveDrag<T> = Coordinate & { data: T };

/**
 * tracks cursor delta and attached data for a drag interaction.
 * `stopDrag` and `applyMove` return undefined when no drag is active for use as a guard.
 *
 * @param getPosition returns the dragged item's current position given its data
 */
export const useDragState = <T extends object>(
  getPosition: (data: T) => Coordinate,
) => {
  let activeDrag: ActiveDrag<T> | undefined;

  const startDrag = (coords: Coordinate, data: T) => {
    activeDrag = { ...coords, data };
  };

  const stopDrag = () => {
    if (!activeDrag) return;
    const { data } = activeDrag;
    activeDrag = undefined;
    return data;
  };

  const applyMove = (newCoords: Coordinate) => {
    if (!activeDrag) return;

    const currentPos = getPosition(activeDrag.data);

    const dx = newCoords.x - activeDrag.x;
    const dy = newCoords.y - activeDrag.y;

    activeDrag.x = newCoords.x;
    activeDrag.y = newCoords.y;

    return {
      x: currentPos.x + dx,
      y: currentPos.y + dy,
      data: activeDrag.data,
    };
  };

  return {
    startDrag,
    stopDrag,
    applyMove,
  };
};
