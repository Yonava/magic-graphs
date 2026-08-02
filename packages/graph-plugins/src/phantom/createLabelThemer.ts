import { PluginOptions } from '@graph/plugins-shared/plugins';
import { CoreNode } from '@graph/primitives/types';

import { PHANTOM_PLUGIN_ID } from './constants.ts';
import { PhantomNode, PhantomPlugin } from './types.ts';

const layerId = `${PHANTOM_PLUGIN_ID}/createLabelThemer`;

export const createLabelThemer = (
  controls: PluginOptions<PhantomPlugin>['controls'],
  nodes: PhantomNode[],
) => {
  const canvas = controls.canvas.theme.createLayer(layerId);
  const focus = controls.focus?.theme.createLayer(layerId);

  // undefined for real graph nodes, letting the resolver fall through to whatever labels them
  const label = (node: CoreNode) =>
    nodes.find((phantomNode) => phantomNode.id === node.id)?.label;

  const enable = () => {
    canvas.set('node.default.text.content', label);
    canvas.set('node.hover.text.content', label);
    focus?.set('node.focus.text.content', label);
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
