import { DragStateControls } from '../../shared/drag/types.ts';
import { CanvasControls } from '../canvas/themes.ts';
import { CURSOR } from '../canvas/themes/cursor.ts';
import { NodeAnchor } from './types.ts';

export const createAnchorDragThemer = (
  createLayer: CanvasControls['theme']['createLayer'],
  dragState: DragStateControls<NodeAnchor>,
) => {
  const { set, removeAll } = createLayer('plugins/anchors/drag');

  const globalGrabbing = () =>
    dragState.isDragging() ? CURSOR.GRABBING : undefined;

  const enable = () => {
    set('canvas.cursor', globalGrabbing);
    set('nodeAnchor.default.cursor', CURSOR.GRAB);
    set('nodeAnchor.focus.cursor', CURSOR.GRAB);
  };

  return {
    enable,
    disable: removeAll,
  };
};
