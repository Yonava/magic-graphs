import { DragStateControls } from '@magic/graph-plugins/shared/drag/types';

import { CanvasControls } from '../canvas/themes.ts';
import { CURSOR } from '../canvas/themes/cursor.ts';
import { NODE_DRAG_PLUGIN_ID } from './constants.ts';
import { NodeIdDragState } from './types.ts';

export const createDragThemer = (
  createLayer: CanvasControls['theme']['createLayer'],
  dragState: DragStateControls<NodeIdDragState>,
) => {
  const { set, removeAll } = createLayer(`${NODE_DRAG_PLUGIN_ID}/theme`);

  const globalGrabbing = () =>
    dragState.isDragging() ? CURSOR.GRABBING : undefined;

  const activate = () => {
    set('canvas.cursor', globalGrabbing);
    set('node.default.cursor', CURSOR.GRAB);
    set('node.focus.cursor', CURSOR.GRAB);
    set('marquee.encapsulatedNodeBox.cursor', CURSOR.GRAB);
  };

  return {
    activate,
    deactivate: removeAll,
  };
};
