import { CanvasControls } from '../canvas/types.ts';
import { NODE_DRAG_PLUGIN_ID } from '../node-drag/constants.ts';
import { NodeLabelControls } from './types.ts';

export const createLabelThemer = (
  theme: CanvasControls['theme'],
  getLabel: NodeLabelControls['get'],
) => {
  const layer = theme.createLayer(NODE_DRAG_PLUGIN_ID);

  const enable = () => {
    layer.set('node.default.text', (n) => getLabel(n.id));
    // TODO will work when focus tokens actually resolve properly
    layer.set('node.focus.text', (n) => getLabel(n.id));
  };

  return {
    enable,
    disable: layer.removeAll,
  };
};
