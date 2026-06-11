import { CoreGraph } from '../../core/types.ts';
import { DragStateControls } from '../../shared/drag/types.ts';
import { CURSOR } from '../../themes/cursor.ts';
import { useTheme } from '../../themes/useTheme.ts';
import { NodeIdDragState } from './types.ts';

export const useDragCursorTheme = (
  graph: Pick<CoreGraph, 'themeMap'>,
  dragState: DragStateControls<NodeIdDragState>,
) => {
  const { setTheme, removeAllThemes } = useTheme(graph, 'plugin/drag');

  const globalGrabbing = () =>
    dragState.isDragging() ? CURSOR.GRABBING : undefined;

  const activate = () => {
    setTheme('canvas.cursor', globalGrabbing);
    setTheme('node.default.cursor', CURSOR.GRAB);
    setTheme('node.focus.cursor', CURSOR.GRAB);
    setTheme('marquee.encapsulatedNodeBox.cursor', CURSOR.GRAB);
  };

  const deactivate = () => {
    removeAllThemes();
  };

  return {
    activate,
    deactivate,
  };
};
