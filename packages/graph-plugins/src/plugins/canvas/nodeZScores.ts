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
    const zA = positions.get(a.id).z;
    const zB = positions.get(b.id).z;
    if (zA !== zB) return zB - zA;
    return nodes.indexOf(b) - nodes.indexOf(a);
  });

  for (let i = 0; i < nodesSortedByZ.length; i++) {
    zScores.set(nodesSortedByZ[i].id, increment * i);
  }

  return zScores;
};
