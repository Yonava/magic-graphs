import type { Edge } from '../types.ts';
import { type Parent, union } from './unionFind.ts';

// An edge from a equal-weight group, labeled with the current (pre-group)
// component roots of its endpoints, used to detect which edges are still
// able to connect distinct components once processed together
export type ComponentEdge = { edge: Edge; a: string; b: string };

/** Enumerates every spanning tree `pairs` admits over `vertices`. */
export const allSpanningTrees = (
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
