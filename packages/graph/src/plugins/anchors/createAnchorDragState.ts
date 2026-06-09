import { Coordinate } from '@magic/canvas/types';
import { nullThrows } from '@magic/utils/assert';

import { createDragState } from '../drag/createDragState.ts';
import { NodeAnchor } from './types.ts';

export const createAnchorDragState = () => {
  const dragState = createDragState((data: NodeAnchor) => data);
  return {
    ...dragState,
    applyMove: (newCoords: Coordinate) => {
      const data = dragState.applyMove(newCoords);
      if (!data) return;
      const nodeAnchor = nullThrows(
        dragState.getDragState()?.data,
        'data is defined so activeDrag must be populated',
      );
      // @ts-expect-error circumnavigate readonly restriction
      nodeAnchor.x = data.x;
      // @ts-expect-error circumnavigate readonly restriction
      nodeAnchor.y = data.y;
    },
  };
};
