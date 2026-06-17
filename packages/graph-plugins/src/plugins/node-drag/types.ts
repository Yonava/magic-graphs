import { Coordinate } from '@magic/canvas/types';
import { GNode } from '@magic/graph/types';

export type NodeIdDragState = { nodeIds: string[] };

/**
 * info for the node being dragged
 */
export type ActiveDragNode = {
  nodeId: GNode['id'];
  coords: Coordinate;
};
