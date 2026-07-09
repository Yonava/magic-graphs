import { DragStateControls } from '@graph/plugins-shared/drag';
import { CURSOR } from '@graph/plugins-shared/theme';

import { ANCHOR_PLUGIN_ID } from './constants.ts';
import { AnchorsPlugin, NodeAnchor } from './types.ts';

const layerId = `${ANCHOR_PLUGIN_ID}/createAnchorDragThemer`;

export const createAnchorDragThemer = (
  controls: Parameters<AnchorsPlugin>[0]['controls'],
  dragState: DragStateControls<NodeAnchor>,
) => {
  const canvas = controls.canvas.theme.createLayer(layerId);
  const focus = controls.focus?.theme.createLayer(layerId);

  const globalGrabbing = () =>
    dragState.isDragging() ? CURSOR.GRABBING : undefined;

  const enable = () => {
    canvas.set('canvas.cursor', globalGrabbing);
  };

  const disable = () => {
    canvas.removeAll();
    focus?.removeAll();
  };

  return {
    enable,
    disable,
  };
};
