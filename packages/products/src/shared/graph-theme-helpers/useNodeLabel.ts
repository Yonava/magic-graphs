import type { MaybeRef } from 'vue';

import { Graph } from '../useGraphWithCanvas.ts';

/**
 * all types that we accept as a valid serializable label
 */
type LabelLike = string | number | boolean;

type LabelMap = Map<string, LabelLike>;
type LabelGetter = (nodeId: string) => LabelLike | undefined;

export const useNodeLabel = (
  graph: Graph,
  mapOrGetter: MaybeRef<LabelMap> | LabelGetter,
  themeId: string,
) => {
  const get = (nodeId: string) => {
    if (typeof mapOrGetter === 'function') return mapOrGetter(nodeId);
    if ('value' in mapOrGetter) return mapOrGetter.value.get(nodeId);
    return mapOrGetter.get(nodeId);
  };

  const { set, remove } = graph.canvas.theme.createLayer(themeId);

  const nodeText = ({ id }: { id: string }) => {
    if (graph.focus.isFocused(id)) return;
    const label = get(id);
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
