import { DragStateControls } from '../../shared/drag/types.ts';
import { CURSOR } from '../canvas/themes/cursor.ts';
import { CanvasGraph } from '../canvas/types.ts';
import { NodeIdDragState } from './types.ts';

export const createDragThemer = (
  createLayer: CanvasGraph['theme']['createLayer'],
  dragState: DragStateControls<NodeIdDragState>,
) => {
  const { set, removeAll } = createLayer('plugin/drag');

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
