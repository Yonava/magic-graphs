import { CoreGraph } from '../../core/types.ts';
import { DragStateControls } from '../../shared/drag/types.ts';
import { useTheme } from '../../themes/useTheme.ts';
import { NodeIdDragState } from './types.ts';

export const useDragCursorTheme = (
  graph: Pick<CoreGraph, 'themeMap'>,
  dragState: DragStateControls<NodeIdDragState>,
) => {
  const { setTheme, removeAllThemes } = useTheme(graph, 'plugin/drag');

  const globalGrabbing = () =>
    dragState.isDragging() ? 'grabbing' : undefined;

  const activate = () => {
    setTheme('canvas.cursor', globalGrabbing);
    setTheme('node.default.cursor', 'grab');
    setTheme('node.focus.cursor', 'grab');
  };

  const deactivate = () => {
    removeAllThemes();
  };

  return {
    activate,
    deactivate,
  };
};
