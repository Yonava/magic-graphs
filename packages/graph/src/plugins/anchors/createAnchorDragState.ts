import { Coordinate } from '@magic/canvas/types';
import { nullThrows } from '@magic/utils/assert';

import { createDragState } from '../drag/createDragState.ts';
import { NodeAnchor } from './types.ts';

export const createAnchorDragState = () => {
  const dragState = createDragState<NodeAnchor>();
  return {
    ...dragState,
    applyMove: (newCoords: Coordinate) => {
      const data = dragState.applyMove(newCoords);
      if (!data) return;
      const nodeAnchor = nullThrows(
        dragState._internals.accessActiveDrag()?.data,
        'data is defined so activeDrag must be populated',
      );
      nodeAnchor.x = data.x;
      nodeAnchor.y = data.y;
    },
  };
};
