import { resolveNodeComputedTokens } from '@graph/create-graph/render-functions/helpers';

import { MaybeRefOrGetter, toRef } from 'vue';

import { GNode, Graph } from '../../graph/types.ts';
import { useResolvedStyles } from '../shared/useResolvedStyles.ts';

export const useNodeStyles = (
  graph: Graph,
  nodeId: MaybeRefOrGetter<GNode['id']>,
) => {
  const id = toRef(nodeId);
  const res = useResolvedStyles(graph, () => {
    const getStyles = resolveNodeComputedTokens(graph.theme.tokenResolver);
    return getStyles({ id: id.value });
  });
  return { id, ...res };
};
