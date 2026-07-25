import { MaybeRefOrGetter, toRef } from 'vue';

import { GNode, Graph } from '../../graph/types.ts';
import { useResolvedStyles } from '../shared/useResolvedStyles.ts';

export const useNodeStyles = (
  graph: Graph,
  nodeId: MaybeRefOrGetter<GNode['id']>,
) => {
  const id = toRef(nodeId);
  const res = useResolvedStyles(graph, () =>
    graph.theme.resolveNodeStyles({ id: id.value }),
  );
  return { id, ...res };
};
