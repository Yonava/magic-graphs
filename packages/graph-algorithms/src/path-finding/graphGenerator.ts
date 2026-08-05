import fc from 'fast-check';
import Fraction from 'fraction.js';

const nodeIds = fc.uniqueArray(
  fc.stringMatching(/^[A-Z]$/),
  {
    minLength: 1,
    maxLength: 8,
  }
);

const weightArbitrary = fc
  .tuple(
    fc.integer({ min: 0, max: 20 }),
    fc.integer({ min: 1, max: 10 }),
  )
  .map(([n, d]) => new Fraction(n, d));

export const graphArbitrary = nodeIds.chain(nodes => {
  const possibleEdges = [];

  for (const source of nodes) {
    for (const target of nodes) {
      // allow self-loops
      possibleEdges.push({ source, target });
    }
  }

  return fc
    .array(
      fc.record({
        pair: fc.constantFrom(...possibleEdges),
        weight: weightArbitrary,
      }),
      {
        maxLength: possibleEdges.length * 2, // allows parallel edges
      }
    )
    .map(edges => ({
      nodes: nodes.map(id => ({ id })),
      edges: edges.map((edge, i) => ({
        id: `e${i}`,
        source: edge.pair.source,
        target: edge.pair.target,
        weight: edge.weight,
      })),
    }));
});