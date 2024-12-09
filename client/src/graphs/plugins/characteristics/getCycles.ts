
export const findAllCycles = (adjList: Record<string, string[]>): string[][] => {
  const visited = new Set<string>();
  const cycles: string[][] = [];
  const stack: string[] = [];
  const inStack = new Set<string>();

  const dfs = (node: string, parent: string | null): void => {
    visited.add(node);
    stack.push(node);
    inStack.add(node);

    for (const neighbor of adjList[node] || []) {
      if (!visited.has(neighbor)) {
        dfs(neighbor, node);
      } else if (neighbor !== parent && inStack.has(neighbor)) {
        // A cycle is detected
        const cycleStartIndex = stack.indexOf(neighbor);
        const cycle = stack.slice(cycleStartIndex);
        const sortedCycle = [...cycle].sort(); // Ensure consistent ordering
        if (!cycles.some(existing => areArraysEqual(existing, sortedCycle))) {
          cycles.push(sortedCycle);
        }
      }
    }

    stack.pop();
    inStack.delete(node);
  };

  // Helper function to check if two arrays are equal (ignoring order)
  const areArraysEqual = (arr1: string[], arr2: string[]): boolean => {
    if (arr1.length !== arr2.length) return false;
    return arr1.every(item => arr2.includes(item));
  };

  // Check all connected components
  for (const node in adjList) {
    if (!visited.has(node)) {
      dfs(node, null);
    }
  }

  return cycles
}