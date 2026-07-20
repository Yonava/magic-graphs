import { delta } from '@core/utils/delta/index';

type IdentifiableElement = { id: string };

// deliberately duck-typed against createGraph()'s public return, not imported from
// @graph/create-graph — this package is an opt-in consumer of the SDK surface, not
// something create-graph wires in for you. any object with this shape works.
export type GettersAuditGraph = {
  getNode: (id: string) => IdentifiableElement;
  getEdge: (id: string) => IdentifiableElement;
  getNodes: () => IdentifiableElement[];
  getEdges: () => IdentifiableElement[];
};

export const DISCREPANCY_CHECK_INTERVAL_MS = 3000;

// keyed by id rather than diffed by array index, so a node/edge that's merely in a
// different position between the two snapshots doesn't read as a discrepancy.
const byId = (elements: IdentifiableElement[]) =>
  Object.fromEntries(elements.map((element) => [element.id, element]));

const checkForDiscrepancy = (graph: GettersAuditGraph) => {
  const cachedNodes = graph.getNodes();
  const cachedEdges = graph.getEdges();

  const freshNodes = cachedNodes.map((node) => graph.getNode(node.id));
  const freshEdges = cachedEdges.map((edge) => graph.getEdge(edge.id));

  const nodesDiff = delta(byId(cachedNodes), byId(freshNodes));
  if (nodesDiff) {
    console.error(
      '[graph-dev-tools] getNodes() is stale — a plugin changed data a getNode getter ' +
        'reads without calling invalidateGetters().',
      nodesDiff,
    );
  }

  const edgesDiff = delta(byId(cachedEdges), byId(freshEdges));
  if (edgesDiff) {
    console.error(
      '[graph-dev-tools] getEdges() is stale — a plugin changed data a getEdge getter ' +
        'reads without calling invalidateGetters().',
      edgesDiff,
    );
  }
};

// safety net for the invalidateGetters() convention every plugin in @graph/create-graph
// is handed (see plugin.ts [2] there). strictly opt-in: import and start this yourself
// in your own product code, and stop it yourself (e.g. onUnmounted) — create-graph never
// starts this on your behalf, so consumers who trust their plugins pay nothing for it,
// not in bundle size and not in lifecycle complexity.
//
// runs on a real, independent setInterval, deliberately not gated on the graph's own
// getNodes()/getEdges() calls or its onGettersInvalidated notification — both of those
// are downstream of the very recompute that would already have fixed any drift, so
// triggering off of them would almost never observe a genuine discrepancy. this needs
// its own clock to have a real chance of catching a getter that changed without a
// matching invalidateGetters() call before something unrelated fixes it first.
//
// assumes getters are pure functions of stable internal state (no Date.now(), no
// randomness); anything else will false-positive here.
export const startGettersDiscrepancyAudit = (graph: GettersAuditGraph) => {
  const interval = setInterval(() => {
    checkForDiscrepancy(graph);
  }, DISCREPANCY_CHECK_INTERVAL_MS);

  return () => clearInterval(interval);
};
