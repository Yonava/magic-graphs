import { NODE_DRAG_PLUGIN_ID } from '../node-drag/constants.ts';
import { NodeLabelControls, NodeLabelPlugin } from './types.ts';

const layerId = `${NODE_DRAG_PLUGIN_ID}/createLabelThemer`;

export const createLabelThemer = (
  controls: Parameters<NodeLabelPlugin>[0],
  getLabel: NodeLabelControls['get'],
) => {
  const canvas = controls.canvas.theme.createLayer(layerId);
  const focus = controls.focus?.theme.createLayer(layerId);

  const enable = () => {
    canvas.set('node.default.text.content', (n) => getLabel(n.id));
    focus?.set('node.focus.text.content', (n) => getLabel(n.id));
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
