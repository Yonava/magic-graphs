import { NodePositionUpdate } from '@magic/graph/core/positions/types';
import { CoreNode } from '@magic/graph/types';

export const rotateNodeZIndexes = (
  nodeId: string,
  nodes: readonly CoreNode[],
  getZ: (id: string) => number,
): NodePositionUpdate[] => {
  const sorted = nodes.toSorted((a, b) => getZ(b.id) - getZ(a.id));

  if (getZ(nodeId) === getZ(sorted[0].id)) return [];

  const hoveredIndex = sorted.findIndex((n) => n.id === nodeId);
  const topZ = getZ(sorted[0].id);

  const updates: NodePositionUpdate[] = [{ nodeId, update: { z: topZ } }];
  for (let i = 0; i < hoveredIndex; i++) {
    updates.push({ nodeId: sorted[i].id, update: { z: getZ(sorted[i + 1].id) } });
  }

  return updates;
};
