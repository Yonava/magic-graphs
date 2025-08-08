import { useTheme } from '@graph/themes/useTheme';
import type { GNode, Graph } from '@graph/types';

import type { MaybeRef } from 'vue';

/**
 * all types that we accept as a valid serializable label
 */
type LabelLike = string | number | boolean;

type LabelMap = Map<GNode['id'], LabelLike>;
type LabelGetter = (nodeId: GNode['id']) => LabelLike;

const DEFAULT_USETHEME_ID = 'node-labeller';

export const useNodeLabel = (
  graph: Graph,
  mapOrGetter: MaybeRef<LabelMap> | LabelGetter,
  themeId = DEFAULT_USETHEME_ID,
) => {
  const get = (nodeId: GNode['id']) => {
    if (typeof mapOrGetter === 'function') return mapOrGetter(nodeId);
    if ('value' in mapOrGetter) return mapOrGetter.value.get(nodeId);
    return mapOrGetter.get(nodeId);
  };

  const { setTheme, removeTheme } = useTheme(graph, themeId);

  const nodeText = (node: GNode) => {
    if (graph.focus.isFocused(node.id)) return;
    const label = get(node.id);
    if (label === undefined) return;
    return label.toString();
  };

  const label = () => {
    setTheme('nodeText', nodeText);
  };

  const unlabel = () => {
    removeTheme('nodeText');
  };

  return {
    label,
    unlabel,

    get,
  };
};
