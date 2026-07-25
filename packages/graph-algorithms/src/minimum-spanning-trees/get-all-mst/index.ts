import Fraction from 'fraction.js';

import type { Edge, Node } from '../types.ts';

type Parent = Map<string, string>;

const find = (parent: Parent, nodeId: string): string => {
  if (parent.get(nodeId) !== nodeId) {
    parent.set(nodeId, find(parent, parent.get(nodeId)!));
  }
  return parent.get(nodeId)!;
};

const union = (parent: Parent, nodeA: string, nodeB: string): boolean => {
  const rootA = find(parent, nodeA);
  const rootB = find(parent, nodeB);

  if (rootA === rootB) return false;

  parent.set(rootA, rootB);
  return true;
};

// An edge from a equal-weight group, labeled with the current (pre-group)
// component roots of its endpoints, used to detect which edges are still
// able to connect distinct components once processed together
type ComponentEdge = { edge: Edge; a: string; b: string };

const allSpanningTrees = (
  vertices: string[],
  pairs: ComponentEdge[],
): Edge[][] => {
  const needed = vertices.length - 1;
  if (needed === 0) return [[]];

  const results: Edge[][] = [];

  const search = (index: number, selected: Edge[], parent: Parent): void => {
    // union() prevents cycles
    if (selected.length === needed) {
      results.push([...selected]);
      return;
    }

    const remaining = pairs.length - index;
    if (selected.length + remaining < needed) return;

    const { edge, a, b } = pairs[index];

    const includedParent = new Map(parent);
    if (union(includedParent, a, b)) {
      selected.push(edge);
      search(index + 1, selected, includedParent);
      selected.pop();
    }

    search(index + 1, selected, parent);
  };

  search(0, [], new Map(vertices.map((vertex) => [vertex, vertex])));

  return results;
};

/**
 * Finds every minimum spanning tree (MST) of a weighted graph using a
 * generalized Kruskals algorithm. If the graph is disconnected, returns every
 * minimum spanning forest instead.
 *
 * Processes edges in non-decreasing order of weight. Edges with equal weight
 * are handled simultaneously: all valid spanning trees within each connected
 * equal-weight component are enumerated, and the Cartesian product of these
 * independent choices produces every possible MST.
 *
 * @complexity
 * Time:  O(E log E + T)   Θ(E log E + T)   Ω(E log E)
 * Space: O(E + T)         Θ(E + T)         Ω(V)
 *
 * where V = number of vertices, E = number of edges, and
 * T = total size of the output (the total number of edges across all
 * returned minimum spanning trees). In the worst case, the number of
 * minimum spanning trees is exponential in V.
 * CAUTION: FUNCTION IS EXPONENTIAL IN THE NUMBER OF EQUAL-WEIGHT EDGES, AND WILL BLOW UP IF GIVEN A LARGE GROUP!
 */
export const getAllMsts = (nodes: Node[], edges: Edge[]) => {
  const parent: Parent = new Map(nodes.map((node) => [node.id, node.id]));

  const sortedEdges = edges
    .filter((edge) => edge.source !== edge.target)
    .toSorted((a, b) => a.weight.compare(b.weight));

  const weightGroups: Edge[][] = [];
  sortedEdges.forEach((edge) => {
    const lastGroup = weightGroups[weightGroups.length - 1];
    if (lastGroup && lastGroup[0].weight.compare(edge.weight) === 0) {
      lastGroup.push(edge);
    } else {
      weightGroups.push([edge]);
    }
  });

  // Each entry is one independent choice point (a connected component of a
  // equal-weight group), holding every spanning tree that component admits
  // The final set of MSTs is the Cartesian product of these choice points
  const choicePoints: Edge[][][] = [];

  for (const group of weightGroups) {
    const pairs: ComponentEdge[] = group
      .map((edge) => ({
        edge,
        a: find(parent, edge.source),
        b: find(parent, edge.target),
      }))
      .filter(({ a, b }) => a !== b);

    if (pairs.length === 0) continue;

    const touchedVertices = new Set<string>();
    pairs.forEach(({ a, b }) => {
      touchedVertices.add(a);
      touchedVertices.add(b);
    });

    const groupParent: Parent = new Map(
      [...touchedVertices].map((vertex) => [vertex, vertex]),
    );
    pairs.forEach(({ a, b }) => union(groupParent, a, b));

    const components = new Map<
      string,
      { vertices: Set<string>; pairs: ComponentEdge[] }
    >();

    touchedVertices.forEach((vertex) => {
      const root = find(groupParent, vertex);
      if (!components.has(root)) {
        components.set(root, { vertices: new Set(), pairs: [] });
      }
      components.get(root)!.vertices.add(vertex);
    });

    pairs.forEach((pair) => {
      const root = find(groupParent, pair.a);
      components.get(root)!.pairs.push(pair);
    });

    components.forEach(({ vertices, pairs: componentPairs }) => {
      const options = allSpanningTrees([...vertices], componentPairs);
      choicePoints.push(options);

      if (options.length === 0) {
        throw new Error(
          'Options should not be empty; this indicates a bug in the algorithm.',
        );
      }
      // Advance the real union-find with one arbitrary valid choice, so
      // later (strictly higher-weight) groups see the correct components
      options[0].forEach((edge) => union(parent, edge.source, edge.target));
    });
  }

  let msts: Edge[][] = [[]];
  choicePoints.forEach((options) => {
    const next: Edge[][] = [];
    msts.forEach((combo) => {
      options.forEach((option) => {
        next.push([...combo, ...option]);
      });
    });
    msts = next;
  });

  return {
    msts,
    // the weight of a minimum spanning forest, if applicable
    totalWeight: msts[0].reduce(
      (sum, edge) => sum.add(edge.weight),
      new Fraction(0),
    ),
    connected: msts[0].length === nodes.length - 1,
  };
};
