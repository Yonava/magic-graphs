import { GraphGetters } from '@graph/primitives/getters/types';
import { CoreEdge, CoreNode } from '@graph/primitives/types';

import { GettersInvalidationEventHub } from './consumer-events.ts';
import { createGettersAuditTrigger } from './getters-audit.ts';

type NodeEdgeIdSource = {
  nodeIds: () => CoreNode['id'][];
  edgeIds: () => CoreEdge['id'][];
};

// getNodes()/getEdges() are a cache over the per-id getters, not a live view — the cache
// is only as fresh as the last recompute. create-graph keeps it fresh in two ways: it
// invalidates automatically on its own structural/weight consumer events, and it hands
// every plugin an `invalidateGetters` function to call whenever a mutation of its own
// state (e.g. nodeLabel's nodeIdToLabel map) would change what a getter returns. there's
// no way to detect that automatically — it's a convention plugin authors have to know.
//
// onGettersInvalidated fires on its own dedicated hub, not the main consumer event hub —
// it's internal plumbing for this staleness problem, not part of the curated consumer
// vocabulary. see events._internal.gettersInvalidation.
export const createGettersCache = <Getters extends GraphGetters<any>>(
  ids: NodeEdgeIdSource,
  resolveGetters: () => Getters,
  gettersInvalidationEvents: GettersInvalidationEventHub,
) => {
  let nodesCache: ReturnType<Getters['getNode']>[] = [];
  let edgesCache: ReturnType<Getters['getEdge']>[] = [];
  let flushScheduled = false;

  const recompute = () => {
    const getters = resolveGetters();
    nodesCache = ids.nodeIds().map((id) => getters.getNode(id));
    edgesCache = ids.edgeIds().map((id) => getters.getEdge(id));
  };

  // idempotent and coalesced: however many times invalidateGetters() is called within
  // the same tick, the cache is recomputed and onGettersInvalidated emitted exactly once.
  const invalidateGetters = () => {
    if (flushScheduled) return;
    flushScheduled = true;
    queueMicrotask(() => {
      flushScheduled = false;
      recompute();
      gettersInvalidationEvents.emit('onGettersInvalidated');
    });
  };

  const getNodes = () => nodesCache;
  const getEdges = () => edgesCache;

  // see getters-audit.ts — triggered by getNodes()/getEdges() calls rather than a
  // standing timer, so it never needs disposal.
  const triggerAudit = createGettersAuditTrigger(ids, resolveGetters, {
    getNodes,
    getEdges,
  });

  return {
    invalidateGetters,
    recompute,
    getNodes: () => {
      triggerAudit();
      return getNodes();
    },
    getEdges: () => {
      triggerAudit();
      return getEdges();
    },
  };
};
