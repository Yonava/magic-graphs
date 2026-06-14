import { CanvasGraph } from '@magic/graph/plugins/canvas/types';

import { NodeLabelStoreControls } from './types.ts';

export const createLabelThemer = (
  theme: CanvasGraph['theme'],
  getLabel: NodeLabelStoreControls['get'],
) => {
  const layer = theme.createLayer('add-on/node-label');

  const activate = () => {
    layer.set('node.default.text', (n) => getLabel(n.id));
    // TODO will work when focus tokens actually resolve properly
    layer.set('node.focus.text', (n) => getLabel(n.id));
  };

  return {
    activate,
    deactivate: layer.removeAll,
  };
};
