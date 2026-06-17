export const validateNodeIds = (
  nodeIdsOrJunk: unknown,
): nodeIdsOrJunk is string[] => {
  if (!Array.isArray(nodeIdsOrJunk)) return false;
  return nodeIdsOrJunk.every(
    (nodeIdOrJunk) => typeof nodeIdOrJunk === 'string',
  );
};
