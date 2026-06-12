import { useTheme } from '@magic/graph/plugins/canvas/themes/useTheme';
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

  const { setTheme, removeTheme } = useTheme(graph, themeId);

  const nodeColor = (node: GNode) => {
    if (graph.focus.isFocused(node.id)) return;
    return get(node.id);
  };

  const color = () => {
    setTheme('node.default.borderColor', nodeColor);
    setTheme('nodeAnchor.default.color', nodeColor);
  };

  const uncolor = () => {
    removeTheme('node.default.borderColor');
    removeTheme('nodeAnchor.default.color');
  };

  return {
    color,
    uncolor,

    get,
  };
};
