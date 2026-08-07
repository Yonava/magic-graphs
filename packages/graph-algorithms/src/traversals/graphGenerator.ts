import fc from 'fast-check';

type Graph = Record<string, string[]>;

const nodeArbitrary = fc.uniqueArray(fc.stringMatching(/^[A-Z]$/), {
  minLength: 1,
  maxLength: 20,
});

// Builds an adjacency list over `nodes`, allowing parallel edges but no
// self-loops.
export const graphArbitrary: fc.Arbitrary<Graph> = nodeArbitrary.chain(
  (nodes) => {
    const edges = fc.array(
      fc.tuple(fc.constantFrom(...nodes), fc.constantFrom(...nodes)),
      { maxLength: nodes.length * 20 },
    );

    return edges.map((edges) => {
      const graph: Graph = Object.fromEntries(nodes.map((node) => [node, []]));

      for (const [from, to] of edges) {
        if (from !== to) {
          graph[from].push(to);
        }
      }

      return graph;
    });
  },
);
