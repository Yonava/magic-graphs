import { Fraction } from 'fraction.js'

type Node = {
  id: string;
}

type Edge = {
  id: string;
  source: string;
  target: string;
  weight: Fraction;
}

type QueueEntry = {
  node: string;
  distance: Fraction;
};

export type DijkstraResult = {
  distances: Map<string, Fraction>;
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

  for (const edge of edges) {
    if (!graph.has(edge.source)) graph.set(edge.source, []);
    graph.get(edge.source)!.push({
      to: edge.target,
      weight: edge.weight,
    });
  }

  const distances = new Map<string, Fraction>();
  const previous = new Map<string, string | null>();
  const visited = new Set<string>();

  for (const node of nodes) {
    distances.set(node.id, new Fraction(Infinity));
    previous.set(node.id, null);
  }

  distances.set(start, new Fraction(0));

  const queue: QueueEntry[] = [{ node: start, distance: new Fraction(0) }];

  while (queue.length > 0) {
    queue.sort((a, b) => a.distance.compare(b.distance));
    const current = queue.shift()!;

    if (visited.has(current.node)) continue;
    visited.add(current.node);

    if (current.distance.compare(Infinity) === 0) break;

    const currentDist = distances.get(current.node)!;
    const neighbors = graph.get(current.node) ?? [];

    for (const edge of neighbors) {
      if (visited.has(edge.to)) continue;

      const candidate = currentDist.add(edge.weight);
      const currentTargetDist = distances.get(edge.to)!;

      if (candidate.compare(currentTargetDist) < 0) {
        distances.set(edge.to, candidate);
        previous.set(edge.to, current.node);
        queue.push({ node: edge.to, distance: candidate });
      }
    }
  }

  const connected = [...distances.values()].every(
    d => d.compare(Infinity) !== 0
  );

  return {
    distances,
    previous,
    connected,
  };
}