import fc from 'fast-check';

type Node = {
  id: string;
};

type Edge = {
  id: string;
  source: string;
  target: string;
  weight: number;
};

type Graph = {
  nodes: Node[];
  edges: Edge[];
};

const nodeArbitrary = fc.uniqueArray(fc.stringMatching(/^[A-Z]$/), {
  minLength: 1,
  maxLength: 8,
});

const weightArbitrary = fc.integer({
  min: 1,
  max: 100,
});

export const graphArbitrary: fc.Arbitrary<Graph> = nodeArbitrary.chain(
  (ids) => {
    const nodes = ids.map((id) => ({ id }));

    if (nodes.length === 1) {
      return fc.constant({
        nodes,
        edges: [],
      });
    }

    const treeEdges: Omit<Edge, 'weight'>[] = [];

    for (let i = 1; i < nodes.length; i++) {
      // probably bad to have random() inside fc
      const parentIndex = Math.floor(Math.random() * i);

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
        .map((weights) => ({
          nodes,
          edges: allEdges.map((edge, i) => ({
            ...edge,
            weight: weights[i],
          })),
        }));
    });
  },
);
