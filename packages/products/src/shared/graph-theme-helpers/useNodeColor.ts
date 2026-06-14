import type { Color } from '@magic/utils/colors';

import type { MaybeRef } from 'vue';

import type { GNode } from '../useGraph.ts';
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

  const nodeColor = (nodeId: GNode['id']) => {
    if (graph.focus.isFocused(nodeId)) return;
    return get(nodeId);
  };

  const color = () => {
    set('node.default.borderColor', ({ id }) => nodeColor(id));
    set('nodeAnchor.default.color', ({ id }) => nodeColor(id));
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
