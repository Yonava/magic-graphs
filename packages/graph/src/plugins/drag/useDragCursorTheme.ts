import { CoreGraph } from '../../core/types.ts';
import { useTheme } from '../../themes/useTheme.ts';

export const useDragCursorTheme = (
  graph: Pick<CoreGraph, 'themeMap'>,
  dragState: any,
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
