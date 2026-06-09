import { Coordinate } from '@magic/canvas/types';

import { computed, ref } from 'vue';

/**
 * tracks cursor delta and attached data for a drag interaction.
 * `stopDrag` and `applyMove` return undefined when no drag is active for use as a guard.
 *
 * @param getPosition returns the dragged item's current position given its data
 */
export const useDragState = <T extends object>(
  getPosition: (data: T) => Coordinate,
) => {
  const activeDrag = ref<Coordinate & { data: T }>();

  const startDrag = (coords: Coordinate, data: T) => {
    activeDrag.value = { ...coords, data };
  };

  const stopDrag = () => {
    if (!activeDrag.value) return;
    const { data } = activeDrag.value;
    activeDrag.value = undefined;
    return data;
  };

  const applyMove = (newCoords: Coordinate) => {
    if (!activeDrag.value) return;

    const currentPos = getPosition(activeDrag.value.data);

    const dx = newCoords.x - activeDrag.value.x;
    const dy = newCoords.y - activeDrag.value.y;

    activeDrag.value.x = newCoords.x;
    activeDrag.value.y = newCoords.y;

    return {
      x: currentPos.x + dx,
      y: currentPos.y + dy,
      data: activeDrag.value.data,
    };
  };

  return {
    applyMove,
    isDragging: computed(() => !!activeDrag.value),
    startDrag,
    stopDrag,
  };
};
