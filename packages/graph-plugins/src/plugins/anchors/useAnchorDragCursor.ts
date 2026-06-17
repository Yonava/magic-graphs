import { DragStateControls } from '../../shared/drag/types.ts';
import { CURSOR } from '../canvas/themes/cursor.ts';
import { CanvasPluginControls } from '../canvas/types.ts';
import { NodeAnchor } from './types.ts';

export const useAnchorDragCursor = (
  createLayer: CanvasPluginControls['theme']['createLayer'],
  dragState: DragStateControls<NodeAnchor>,
) => {
  const { set, removeAll } = createLayer('plugin/anchors/drag');

  const globalGrabbing = () =>
    dragState.isDragging() ? CURSOR.GRABBING : undefined;

  const activate = () => {
    set('canvas.cursor', globalGrabbing);
    set('nodeAnchor.default.cursor', CURSOR.GRAB);
    set('nodeAnchor.focus.cursor', CURSOR.GRAB);
  };

  return {
    activate,
    deactivate: removeAll,
  };
};
