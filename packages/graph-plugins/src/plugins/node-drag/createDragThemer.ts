import { DragStateControls } from '@magic/graph-plugins/shared/drag/types';

import { CURSOR } from '../canvas/theme/cursor.ts';
import { NODE_DRAG_PLUGIN_ID } from './constants.ts';
import { NodeDragPlugin, NodeIdDragState } from './types.ts';

const layerId = `${NODE_DRAG_PLUGIN_ID}/createDragThemer`;

export const createDragThemer = (
  // TODO this will be more declarative if we deliver plugin arguments in an options bag!
  controls: Parameters<NodeDragPlugin>[0],
  dragState: DragStateControls<NodeIdDragState>,
) => {
  const canvas = controls.canvas.theme.createLayer(layerId);
  const focus = controls.focus?.theme.createLayer(layerId);
  const marquee = controls.marquee?.theme.createLayer(layerId);

  const globalGrabbing = () =>
    dragState.isDragging() ? CURSOR.GRABBING : undefined;

  const enable = () => {
    canvas.set('canvas.cursor', globalGrabbing);
    canvas.set('node.default.cursor', CURSOR.GRAB);
    focus?.set('node.focus.cursor', CURSOR.GRAB);
    marquee?.set('marquee.encapsulatedNodeBox.cursor', CURSOR.GRAB);
  };

  const disable = () => {
    canvas.removeAll();
    focus?.removeAll();
    marquee?.removeAll();
  };

  return {
    enable,
    disable,
  };
};
