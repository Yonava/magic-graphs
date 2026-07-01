/**
 * Breadth-first search. Returns nodes in the order they were visited,
 * starting from `start`. Nodes unreachable from `start` are not included.
 *
 * Explores neighbors level by level using a queue, guaranteeing that nodes
 * are visited in non-decreasing order of hop distance from `start`.
 *
 * @complexity
 * Time:  O(V + E)   Θ(V + E)   Ω(1)
 * Space: O(V)       Θ(V)       Ω(1)
 *
 * where V = number of vertices, E = number of edges
 */
export function breadthFirstSearch(
  graph: Record<string, string[]>,
  start: string,
): string[] {
  if (!(start in graph)) return [];

  const visited = new Set<string>([start]);
  const queue = [start];
  const order: string[] = [];

  while (queue.length > 0) {
    const node = queue.shift()!;
    order.push(node);
    for (const neighbor of graph[node] ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return order;
}
