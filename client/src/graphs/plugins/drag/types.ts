import type { GNode } from '@graph/types';
import type { Coordinate } from '@shape/types/utility';

/**
 * info for the node being dragged
 */
export type ActiveDragNode = {
  node: GNode;
  coords: Coordinate;
};
