import { NodePositionStoreControls } from '@magic/graph/core/positions/types';
import { CoreNode } from '@magic/graph/types';

export const getNodeZScores = ({
  nodes,
  positions,
}: {
  nodes: readonly CoreNode[];
  positions: NodePositionStoreControls;
}) => {
  const zScores = new Map<string, number>();
  if (nodes.length === 0) return zScores;

  const increment = 1 / nodes.length;

  const nodesSortedByZ = nodes.toSorted((a, b) => {
    return positions.get(a.id).z - positions.get(b.id).z;
  });

  for (let i = 0; i < nodesSortedByZ.length; i++) {
    zScores.set(nodesSortedByZ[i].id, increment * i);
  }

  return zScores;
};
