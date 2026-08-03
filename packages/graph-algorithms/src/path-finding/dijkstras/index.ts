import Fraction from 'fraction.js';

export type Node = {
  id: string;
};

export type Edge = {
  id: string;
  source: string;
  target: string;
  weight: Fraction;
};

type QueueEntry = {
  node: string;
  distance: Fraction;
};

export type DijkstraResult = {
  distances: Map<string, Fraction | null>;
  previous: Map<string, string | null>;
  connected: boolean;
};

export function dijkstra(
  nodes: Node[],
  edges: Edge[],
  start: string,
): DijkstraResult {
  const graph = new Map<string, { to: string; weight: Fraction }[]>();

  for (const node of nodes) {
    graph.set(node.id, []);
  }

  if (!graph.has(start)) {
    throw new Error(`Unknown start node "${start}".`);
  }

  for (const edge of edges) {
    if (!graph.has(edge.source)) {
      throw new Error(`Edge "${edge.id}" references unknown source "${edge.source}".`);
    }

    if (!graph.has(edge.target)) {
      throw new Error(`Edge "${edge.id}" references unknown target "${edge.target}".`);
    }

    if (edge.weight.compare(0) < 0) {
      throw new Error(
        `Edge "${edge.id}" has a negative weight. Dijkstra's algorithm requires non-negative edge weights.`
      );
    }

    graph.get(edge.source)!.push({
      to: edge.target,
      weight: edge.weight,
    });

    // Uncomment for an undirected graph.
    // graph.get(edge.target)!.push({
    //   to: edge.source,
    //   weight: edge.weight,
    // });
  }

  const distances = new Map<string, Fraction | null>();
  const previous = new Map<string, string | null>();
  const visited = new Set<string>();

  for (const node of nodes) {
    distances.set(node.id, null);
    previous.set(node.id, null);
  }

  distances.set(start, new Fraction(0));

  const queue: QueueEntry[] = [
    {
      node: start,
      distance: new Fraction(0),
    },
  ];

  while (queue.length > 0) {
    queue.sort((a, b) => a.distance.compare(b.distance));

    const current = queue.shift()!;

    if (visited.has(current.node)) {
      continue;
    }

    visited.add(current.node);

    const currentDistance = distances.get(current.node)!;
    const neighbors = graph.get(current.node)!;

    for (const neighbor of neighbors) {
      if (visited.has(neighbor.to)) {
        continue;
      }

      const candidate = currentDistance.add(neighbor.weight);
      const targetDistance = distances.get(neighbor.to);

      if (
        targetDistance == null ||
        candidate.compare(targetDistance) < 0
      ) {
        distances.set(neighbor.to, candidate);
        previous.set(neighbor.to, current.node);

        queue.push({
          node: neighbor.to,
          distance: candidate,
        });
      }
    }
  }

  return {
    distances,
    previous,
    connected: visited.size === nodes.length,
  };
}