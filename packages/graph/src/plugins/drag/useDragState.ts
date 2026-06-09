import { Coordinate } from '@magic/canvas/types';

import { computed, ref } from 'vue';

export const useDragState = <T extends object>() => {
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

  const eventCalled = (newCoords: Coordinate, currentPos: Coordinate) => {
    if (!activeDrag.value) return;
    const dx = newCoords.x - activeDrag.value.x;
    const dy = newCoords.y - activeDrag.value.y;

    activeDrag.value.x = newCoords.x;
    activeDrag.value.y = newCoords.y;

    return { x: currentPos.x + dx, y: currentPos.y + dy };
  };

  return {
    eventCalled,
    isDragging: computed(() => !!activeDrag.value),
    activeDrag,
    startDrag,
    stopDrag,
  };
};
