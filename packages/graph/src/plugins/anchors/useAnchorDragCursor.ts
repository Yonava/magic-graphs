import { DragStateControls } from '../../shared/drag/types.ts';
import { CURSOR } from '../../themes/cursor.ts';
import { FullThemeMap } from '../../themes/types.ts';
import { useTheme } from '../../themes/useTheme.ts';
import { NodeAnchor } from './types.ts';

export const useAnchorDragCursor = (
  graph: { canvas: { themeMap: FullThemeMap } },
  dragState: DragStateControls<NodeAnchor>,
) => {
  const { setTheme, removeAllThemes } = useTheme(graph, 'plugin/anchors/drag');

  const globalGrabbing = () =>
    dragState.isDragging() ? CURSOR.GRABBING : undefined;

  const activate = () => {
    setTheme('canvas.cursor', globalGrabbing);
    setTheme('nodeAnchor.default.cursor', CURSOR.GRAB);
    setTheme('nodeAnchor.focus.cursor', CURSOR.GRAB);
  };

  return {
    activate,
    deactivate: removeAllThemes,
  };
};
