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
      const nodeAnchor = dragState._internals.activeDrag?.data;
      if (!data || !nodeAnchor) return;
      nodeAnchor.x = data.x;
      nodeAnchor.y = data.y;
    },
  };
};
