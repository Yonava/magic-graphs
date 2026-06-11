import { DragStateControls } from '../../shared/drag/types.ts';
import { CURSOR } from '../../themes/cursor.ts';
import { FullThemeMap } from '../../themes/types.ts';
import { useTheme } from '../../themes/useTheme.ts';
import { NodeIdDragState } from './types.ts';

export const useDragCursor = (
  graph: { canvas: { themeMap: FullThemeMap } },
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

  return {
    activate,
    deactivate: removeAllThemes,
  };
};
