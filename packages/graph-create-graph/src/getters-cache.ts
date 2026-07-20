import { GraphGetters } from '@graph/primitives/getters/types';
import { CoreEdge, CoreNode } from '@graph/primitives/types';

import { GettersInvalidationEventHub } from './consumer-events.ts';

type NodeEdgeIdSource = {
  nodeIds: () => CoreNode['id'][];
  edgeIds: () => CoreEdge['id'][];
};

// getNodes()/getEdges() are a cache over the per-id getters, not a live view — the cache
// is only as fresh as the last recompute. create-graph keeps it fresh in two ways: it
// invalidates automatically on its own structural/weight consumer events, and it hands
// every plugin an `invalidateGetters` function to call whenever a mutation of its own
// state (e.g. nodeLabel's nodeIdToLabel map) would change what a getter returns.
export const createGettersCache = <Getters extends GraphGetters<any>>(
  ids: NodeEdgeIdSource,
  resolveGetters: () => Getters,
  gettersInvalidationEvents: GettersInvalidationEventHub,
) => {
  let nodesCache: ReturnType<Getters['getNode']>[] = [];
  let edgesCache: ReturnType<Getters['getEdge']>[] = [];

  const recompute = () => {
    const getters = resolveGetters();
    nodesCache = ids.nodeIds().map((id) => getters.getNode(id));
    edgesCache = ids.edgeIds().map((id) => getters.getEdge(id));
  };

  // recomputes and emits synchronously, every time. Graphs are small (10-50 nodes/edges),
  // so paying for extra recomputes within a tick is cheaper than the staleness footgun of
  // deferring the cache refresh — callers reading getNodes()/getEdges() right after an
  // action always see the result of that action, not last tick's state.
  const invalidateGetters = () => {
    recompute();
    gettersInvalidationEvents.emit('onGettersInvalidated');
  };

  return {
    invalidateGetters,
    recompute,
    getNodes: () => nodesCache,
    getEdges: () => edgesCache,
  };
};
