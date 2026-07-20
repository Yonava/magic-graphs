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

const checkForDiscrepancy = <Getters extends GraphGetters<any>>(
  ids: NodeEdgeIdSource,
  resolveGetters: () => Getters,
  cache: GettersCacheAuditTarget,
) => {
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
};

// dev-only safety net for the invalidateGetters() convention (see plugin.ts [2]). rather
// than tracking whether a plugin remembered to call invalidateGetters, this occasionally
// recomputes nodes/edges straight from the getters and diffs the result against what
// getNodes()/getEdges() currently have cached. any mismatch means state a getter reads
// changed without an invalidation — almost always a forgotten invalidateGetters() call
// somewhere in a plugin's own setter.
//
// triggered by actual getNodes()/getEdges() calls, throttled to roughly once every few
// seconds, rather than a standing timer — no call, no check, nothing left running once
// nobody's reading from the graph anymore, so this needs no disposal. each check is a
// one-shot setTimeout (a macrotask), so it can never race a pending invalidateGetters()
// flush, which runs on a microtask and always drains first. assumes getters are pure
// functions of stable internal state (no Date.now(), no randomness); anything else will
// false-positive here.
export const createGettersAuditTrigger = <Getters extends GraphGetters<any>>(
  ids: NodeEdgeIdSource,
  resolveGetters: () => Getters,
  cache: GettersCacheAuditTarget,
) => {
  let lastCheckedAt = 0;
  let checkScheduled = false;

  return () => {
    if (!import.meta.env.DEV) return;
    if (checkScheduled) return;
    if (Date.now() - lastCheckedAt < DISCREPANCY_CHECK_INTERVAL_MS) return;

    checkScheduled = true;
    setTimeout(() => {
      checkScheduled = false;
      lastCheckedAt = Date.now();
      checkForDiscrepancy(ids, resolveGetters, cache);
    }, 0);
  };
};
