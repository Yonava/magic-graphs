import { useTheme } from '@graph/themes/useTheme';
import type { GNode, Graph } from '@graph/types';

import type { Color } from '@utils/colors';

import type { MaybeRef } from 'vue';

type ColorMap = Map<GNode['id'], Color>;
type ColorGetter = (nodeId: GNode['id']) => Color | undefined;

const DEFAULT_USETHEME_ID = 'node-colorer';

export const useNodeColor = (
  graph: Graph,
  mapOrGetter: MaybeRef<ColorMap> | ColorGetter,
  themeId = DEFAULT_USETHEME_ID,
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
