import { useTheme } from '../themes/useTheme';
import type { GNode, Graph } from '../types';

import type { Color } from '@magic/utils/colors';

import type { MaybeRef } from 'vue';

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
    setTheme('nodeBorderColor', nodeColor);
    setTheme('nodeAnchorColor', nodeColor);
  };

  const uncolor = () => {
    removeTheme('nodeBorderColor');
    removeTheme('nodeAnchorColor');
  };

  return {
    color,
    uncolor,

    get,
  };
};
