import { delta } from '@core/utils/delta/index';
import { GraphGetters } from '@graph/primitives/getters/types';
import { CoreEdge, CoreNode } from '@graph/primitives/types';

type NodeEdgeIdSource = {
  nodeIds: () => CoreNode['id'][];
  edgeIds: () => CoreEdge['id'][];
};

type GettersCacheAuditTarget = {
  getNodes: () => { id: string }[];
  getEdges: () => { id: string }[];
};

export const DISCREPANCY_CHECK_INTERVAL_MS = 3000;

// keyed by id rather than diffed by array index, so a node/edge that's merely in a
// different position between the two snapshots doesn't read as a discrepancy.
const byId = (elements: { id: string }[]) =>
  Object.fromEntries(elements.map((element) => [element.id, element]));

// dev-only safety net for the invalidateGetters() convention (see plugin.ts [2]).
// rather than tracking whether a plugin remembered to call invalidateGetters, this
// periodically recomputes nodes/edges straight from the getters and diffs the result
// against what getNodes()/getEdges() currently have cached. any mismatch means state a
// getter reads changed without an invalidation — almost always a forgotten
// invalidateGetters() call somewhere in a plugin's own setter.
//
// runs on setInterval (a macrotask), so it can never race a pending invalidateGetters()
// flush — that flush runs on a microtask, and microtasks always drain before the next
// macrotask fires. assumes getters are pure functions of stable internal state (no
// Date.now(), no randomness); anything else will false-positive here.
export const startGettersDiscrepancyAudit = <Getters extends GraphGetters<any>>(
  ids: NodeEdgeIdSource,
  resolveGetters: () => Getters,
  cache: GettersCacheAuditTarget,
) => {
  if (!import.meta.env.DEV) return () => {};

  const interval = setInterval(() => {
    const getters = resolveGetters();
    const freshNodes = ids.nodeIds().map((id) => getters.getNode(id));
    const freshEdges = ids.edgeIds().map((id) => getters.getEdge(id));

    const nodesDiff = delta(byId(cache.getNodes()), byId(freshNodes));
    if (nodesDiff) {
      console.error(
        '[create-graph] getNodes() is stale — a plugin changed data a getNode getter ' +
          'reads without calling invalidateGetters().',
        nodesDiff,
      );
    }

    const edgesDiff = delta(byId(cache.getEdges()), byId(freshEdges));
    if (edgesDiff) {
      console.error(
        '[create-graph] getEdges() is stale — a plugin changed data a getEdge getter ' +
          'reads without calling invalidateGetters().',
        edgesDiff,
      );
    }
  }, DISCREPANCY_CHECK_INTERVAL_MS);

  return () => clearInterval(interval);
};
