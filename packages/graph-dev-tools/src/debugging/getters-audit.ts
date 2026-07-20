import { delta } from '@core/utils/delta/index';

export type IdentifiableElement = { id: string };

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

// Safety net for the invalidateGetters() convention (see plugin.ts [2] in
// @graph/create-graph). Strictly opt-in — start and stop it yourself (e.g. onUnmounted);
// create-graph never runs this for you.
//
// Uses its own setInterval rather than hooking getNodes()/getEdges() or
// onGettersInvalidated, since those only run after a recompute already happened —
// checking on those would rarely catch a genuine miss.
//
// Assumes getters are pure functions of stable state; getters using Date.now() or
// randomness will false-positive here.
export const startGettersDiscrepancyAudit = (graph: GettersAuditGraph) => {
  const interval = setInterval(() => {
    checkForDiscrepancy(graph);
  }, DISCREPANCY_CHECK_INTERVAL_MS);

  return () => clearInterval(interval);
};
