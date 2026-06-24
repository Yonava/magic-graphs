import { nullThrows } from '@magic/utils/assert';

import { createDragState } from '../../../graph-plugins-shared/src/drag/createDragState.ts';
import { DragStateControls } from '../../../graph-plugins-shared/src/drag/types.ts';
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
