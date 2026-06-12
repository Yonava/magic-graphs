import type { GNode } from '@magic/graph/types';
import type { Color } from '@magic/utils/colors';

import type { MaybeRef } from 'vue';

import { Graph } from '../useGraphWithCanvas.ts';

type ColorMap = Map<GNode['id'], Color>;
type ColorGetter = (nodeId: GNode['id']) => Color | undefined;

export const useNodeColor = (
  graph: Graph,
  mapOrGetter: MaybeRef<ColorMap> | ColorGetter,
  themeId: string,
) => {
  const get = (nodeId: GNode['id']) => {
    if (typeof mapOrGetter === 'function') return mapOrGetter(nodeId);
    if ('value' in mapOrGetter) return mapOrGetter.value.get(nodeId);
    return mapOrGetter.get(nodeId);
  };

  const { set, remove } = graph.canvas.theme.createLayer(themeId);

  const nodeColor = (node: GNode) => {
    if (graph.focus.isFocused(node.id)) return;
    return get(node.id);
  };

  const color = () => {
    set('node.default.borderColor', nodeColor);
    set('nodeAnchor.default.color', nodeColor);
  };

  const uncolor = () => {
    remove('node.default.borderColor');
    remove('nodeAnchor.default.color');
  };

  return {
    color,
    uncolor,

    get,
  };
};
