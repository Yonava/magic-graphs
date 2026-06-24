import { createDragState } from '@magic/graph-plugins-shared/drag/createDragState';
import { DragStateControls } from '@magic/graph-plugins-shared/drag/types';
import { nullThrows } from '@magic/utils/assert';

import { NodeAnchor } from './types.ts';

export const createAnchorDragState = (): DragStateControls<NodeAnchor> => {
  const dragState = createDragState<NodeAnchor>();
  return {
    ...dragState,
    applyMove: (newCoords) => {
      const data = dragState.applyMove(newCoords);
      if (!data) return;
      const nodeAnchor = nullThrows(
        dragState._internals.accessActiveDrag()?.data,
        'data is defined so activeDrag must be populated',
      );
      nodeAnchor.x += data.deltas.dx;
      nodeAnchor.y += data.deltas.dy;
    },
  };
};
