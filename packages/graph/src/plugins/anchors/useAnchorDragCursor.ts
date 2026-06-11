import { CoreGraph } from '../../core/types.ts';
import { DragStateControls } from '../../shared/drag/types.ts';
import { CURSOR } from '../../themes/cursor.ts';
import { useTheme } from '../../themes/useTheme.ts';
import { NodeAnchor } from './types.ts';

export const useAnchorDragCursor = (
  graph: Pick<CoreGraph, 'themeMap'>,
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
