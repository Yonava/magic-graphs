import type { MaybeRef } from 'vue';

import { useTheme } from '../../themes/useTheme';
import type { GNode, Graph } from '../../types';

/**
 * all types that we accept as a valid serializable label
 */
type LabelLike = string | number | boolean;

type LabelMap = Map<GNode['id'], LabelLike>;
type LabelGetter = (nodeId: GNode['id']) => LabelLike | undefined;

export const useNodeLabel = (
  graph: Graph,
  mapOrGetter: MaybeRef<LabelMap> | LabelGetter,
  themeId: string,
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
    setTheme('node.base.text', nodeText);
  };

  const unlabel = () => {
    removeTheme('node.base.text');
  };

  return {
    label,
    unlabel,

    get,
  };
};
