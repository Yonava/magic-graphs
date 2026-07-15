import fc from 'fast-check';

type Graph = Record<string, string[]>;

export const graphArbitrary = fc
  .array(fc.stringMatching(/^[A-Z]$/), { minLength: 1, maxLength: 10 })
  .map((nodes) => [...new Set(nodes)])
  .chain((nodes) => {
    const edges = fc.array(
      fc.tuple(fc.constantFrom(...nodes), fc.constantFrom(...nodes)),
      {
        maxLength: nodes.length * 3,
      },
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
  });

export const reachableNodes = (graph: Graph, start: string): Set<string> => {
  const visited = new Set<string>();
  const queue = [start];

  while (queue.length) {
    const node = queue.shift()!;

    if (visited.has(node)) continue;

    visited.add(node);

    for (const neighbor of graph[node] ?? []) {
      queue.push(neighbor);
    }
  }

  return visited;
};

export const distances = (graph: Graph, start: string): Map<string, number> => {
  const distance = new Map([[start, 0]]);
  const queue = [start];

  while (queue.length) {
    const node = queue.shift()!;

    for (const neighbor of graph[node] ?? []) {
      if (!distance.has(neighbor)) {
        distance.set(neighbor, distance.get(node)! + 1);

        queue.push(neighbor);
      }
    }
  }

  return distance;
};
