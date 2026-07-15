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
