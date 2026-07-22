/**
 * Depth-first search. Returns nodes in the order they were visited,
 * starting from `start`. Nodes unreachable from `start` are not included.
 *
 * Explores the graph by visiting one path as deeply as possible before
 * backtracking. Uses an explicit stack and records each vertex the first time
 * it is removed from the stack, ignoring any later duplicate occurrences.
 *
 * @complexity
 * Time:  O(V + E)   Θ(V + E)   Ω(1)
 * Space: O(V + E)   Θ(V + E)   Ω(1)
 *
 * where V = number of vertices and E = number of edges.
 */
export function depthFirstSearch(
  graph: Record<string, string[]>,
  start: string,
) {
  const visited = new Set<string>();
  const stack: string[] = [start];
  const order: string[] = [];

  while (stack.length > 0) {
    const vertex = stack.pop();

    if (vertex === undefined || visited.has(vertex)) {
      continue;
    }

    visited.add(vertex);
    order.push(vertex);

    for (const neighbor of graph[vertex] ?? []) {
      stack.push(neighbor);
    }
  }

  return order;
}
