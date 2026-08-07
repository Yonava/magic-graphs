import fc from 'fast-check';
import Fraction from 'fraction.js';

import type { Edge, Node } from '../types/types.ts';

type Graph = {
  nodes: Node[];
  edges: Edge[];
};

const nodeArbitrary = fc.uniqueArray(fc.stringMatching(/^[A-Z]$/), {
  minLength: 1,
  maxLength: 20,
});

// Dijkstra requires non-negative weights, so unlike the other packages'
// generators this one never produces a negative weight.
const weightArbitrary = fc
  .tuple(fc.integer({ min: 0, max: 20 }), fc.integer({ min: 1, max: 10 }))
  .map(([numerator, denominator]) => new Fraction(numerator, denominator));

// Builds edges over every possible node pair, allowing both self-loops and
// parallel edges.
export const graphArbitrary: fc.Arbitrary<Graph> = nodeArbitrary.chain(
  (ids) => {
    const nodes = ids.map((id) => ({ id }));

    const possibleEdges: { source: string; target: string }[] = [];

    for (const source of ids) {
      for (const target of ids) {
        possibleEdges.push({ source, target });
      }
    }

    return fc
      .array(
        fc.record({
          pair: fc.constantFrom(...possibleEdges),
          weight: weightArbitrary,
        }),
        { maxLength: possibleEdges.length * 2 },
      )
      .map((edges) => ({
        nodes,
        edges: edges.map((edge, i) => ({
          id: `e${i}`,
          source: edge.pair.source,
          target: edge.pair.target,
          weight: edge.weight,
        })),
      }));
  },
);