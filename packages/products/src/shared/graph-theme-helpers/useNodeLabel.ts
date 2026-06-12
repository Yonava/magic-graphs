import type { GNode } from '@magic/graph/types';

import type { MaybeRef } from 'vue';

import { Graph } from '../useGraphWithCanvas.ts';

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

  const { set, remove } = graph.canvas.theme.createLayer(themeId);

  const nodeText = (node: GNode) => {
    if (graph.focus.isFocused(node.id)) return;
    const label = get(node.id);
    if (label === undefined) return;
    return label.toString();
  };

  const label = () => {
    set('node.default.text', nodeText);
  };

  const unlabel = () => {
    remove('node.default.text');
  };

  return {
    label,
    unlabel,

    get,
  };
};
