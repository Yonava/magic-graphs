export type Parent = Map<string, string>;

/** Resolves the component root of `nodeId`, compressing the path on the way. */
export const find = (parent: Parent, nodeId: string): string => {
  if (parent.get(nodeId) !== nodeId) {
    parent.set(nodeId, find(parent, parent.get(nodeId)!));
  }
  return parent.get(nodeId)!;
};

/** Merges the components of `nodeA` and `nodeB`, false when already joined. */
export const union = (
  parent: Parent,
  nodeA: string,
  nodeB: string,
): boolean => {
  const rootA = find(parent, nodeA);
  const rootB = find(parent, nodeB);

  if (rootA === rootB) return false;

  parent.set(rootA, rootB);
  return true;
};
