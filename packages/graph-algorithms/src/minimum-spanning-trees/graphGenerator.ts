import fc from 'fast-check';
import Fraction from 'fraction.js';

import type { Edge, Node } from './types.ts';

type Graph = {
  nodes: Node[];
  edges: Edge[];
};

const nodeArbitrary = fc.uniqueArray(fc.stringMatching(/^[A-Z]$/), {
  minLength: 1,
  maxLength: 20,
});

const weightArbitrary = fc
  .tuple(fc.integer({ min: -100, max: 100 }), fc.integer({ min: 1, max: 20 }))
  .map(([numerator, denominator]) => new Fraction(numerator, denominator));

// Builds edges that connect `nodes` into a single component (a random
// spanning tree plus a random subset of extra edges).
const connectedEdgesArbitrary = (nodes: Node[]): fc.Arbitrary<Edge[]> => {
  if (nodes.length <= 1) return fc.constant([]);

  return fc
    .array(fc.integer({ min: 0, max: nodes.length - 1 }), {
      minLength: nodes.length - 1,
      maxLength: nodes.length - 1,
    })
    .chain((parents) => {
      const treeEdges: Omit<Edge, 'weight'>[] = [];

      for (let i = 1; i < nodes.length; i++) {
        const parentIndex = parents[i - 1] % i;

        treeEdges.push({
          id: `${nodes[parentIndex].id}-${nodes[i].id}`,
          source: nodes[parentIndex].id,
          target: nodes[i].id,
        });
      }

      const possibleExtraEdges: Omit<Edge, 'weight'>[] = [];

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const id = `${nodes[i].id}-${nodes[j].id}`;

          if (!treeEdges.some((edge) => edge.id === id)) {
            possibleExtraEdges.push({
              id,
              source: nodes[i].id,
              target: nodes[j].id,
            });
          }
        }
      }

      return fc.subarray(possibleExtraEdges).chain((extraEdges) => {
        const allEdges = [...treeEdges, ...extraEdges];

        return fc
          .array(weightArbitrary, {
            minLength: allEdges.length,
            maxLength: allEdges.length,
          })
          .map((weights) =>
            allEdges.map((edge, i) => ({ ...edge, weight: weights[i] })),
          );
      });
    });
};

export const graphArbitrary: fc.Arbitrary<Graph> = nodeArbitrary.chain(
  (ids) => {
    const nodes = ids.map((id) => ({ id }));

    return connectedEdgesArbitrary(nodes).map((edges) => ({ nodes, edges }));
  },
);

// Always produces a graph with (at least) two disconnected components, by
// building two independently-connected node groups with no edges between them.
export const disconnectedGraphArbitrary: fc.Arbitrary<Graph> = fc
  .uniqueArray(fc.stringMatching(/^[A-Z]$/), { minLength: 2, maxLength: 20 })
  .chain((ids) => {
    const nodes = ids.map((id) => ({ id }));

    return fc.integer({ min: 1, max: nodes.length - 1 }).chain((splitPoint) => {
      const groupA = nodes.slice(0, splitPoint);
      const groupB = nodes.slice(splitPoint);

      return fc
        .tuple(
          connectedEdgesArbitrary(groupA),
          connectedEdgesArbitrary(groupB),
        )
        .map(([edgesA, edgesB]) => ({
          nodes,
          edges: [...edgesA, ...edgesB],
        }));
    });
  });
