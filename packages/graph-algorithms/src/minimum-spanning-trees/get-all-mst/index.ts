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

// An edge from a tied-weight group, labeled with the current (pre-group)
// component roots of its endpoints, used to detect which edges are still
// able to connect distinct components once processed together.
type ComponentEdge = { edge: Edge; a: string; b: string };

// Enumerates every spanning tree that can be built from `pairs` alone,
// via include/exclude backtracking over a per-branch union-find. `pairs`
// are assumed to all connect distinct components at the outset (same-weight
// edges considered simultaneously), so any `vertices.length - 1` of them
// chosen without creating a cycle necessarily spans all of `vertices`.
// CAUTION: FUNCTION IS EXPONENTIAL IN THE NUMBER OF TIED EDGES, AND WILL BLOW UP IF GIVEN A LARGE GROUP.
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
  // tied-weight group), holding every spanning tree that component admits.
  // The final set of MSTs is the Cartesian product of these choice points.
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
      // later (strictly higher-weight) groups see the correct components.
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
    // the weight of a minimum spanning forest,
    totalWeight: msts[0].reduce(
      (sum, edge) => sum.add(edge.weight),
      new Fraction(0),
    ),
    connected: msts[0].length === nodes.length - 1,
  };
};
