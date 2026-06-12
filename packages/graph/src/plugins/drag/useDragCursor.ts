import { DragStateControls } from '../../shared/drag/types.ts';
import { CURSOR } from '../canvas/themes/cursor.ts';
import { CanvasGraph } from '../canvas/types.ts';
import { NodeIdDragState } from './types.ts';

export const useDragCursor = (
  useTheme: CanvasGraph['useTheme'],
  dragState: DragStateControls<NodeIdDragState>,
) => {
  const { setTheme, removeAllThemes } = useTheme('plugin/drag');

  const globalGrabbing = () =>
    dragState.isDragging() ? CURSOR.GRABBING : undefined;

  const activate = () => {
    setTheme('canvas.cursor', globalGrabbing);
    setTheme('node.default.cursor', CURSOR.GRAB);
    setTheme('node.focus.cursor', CURSOR.GRAB);
    setTheme('marquee.encapsulatedNodeBox.cursor', CURSOR.GRAB);
  };

  return {
    activate,
    deactivate: removeAllThemes,
  };
};
