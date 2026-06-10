import { Coordinate } from '@magic/canvas/types';

import { DeepReadonly } from 'vue';

type ActiveDrag<TData extends object> = Coordinate & { data: TData };

/**
 * tracks cursor delta and attached data for a drag interaction.
 * `stopDrag` and `applyMove` return undefined when no drag is active for use as a guard.
 *
 * @param getPosition returns the dragged item's current position given its data
 */
export const createDragState = <TData extends object>() => {
  let activeDrag: ActiveDrag<TData> | undefined;

  const startDrag = (coords: Coordinate, data: TData) => {
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

    const dx = newCoords.x - activeDrag.x;
    const dy = newCoords.y - activeDrag.y;

    activeDrag.x = newCoords.x;
    activeDrag.y = newCoords.y;

    return {
      deltas: { dx, dy },
      data: activeDrag.data as DeepReadonly<TData>,
    } as const;
  };

  return {
    startDrag,
    stopDrag,
    applyMove,

    getDragState: (): DeepReadonly<ActiveDrag<TData>> | undefined =>
      // cast as readonly so consumers cannot type-safely mutate
      activeDrag as DeepReadonly<ActiveDrag<TData>> | undefined,

    /** @internal escape hatch to access a writable version of drag data */
    _internals: {
      accessActiveDrag: () => activeDrag,
    },
  };
};
