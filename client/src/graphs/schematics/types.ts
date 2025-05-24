import type { BaseGraph } from '@graph/base';

/**
 * a shape resolver takes an id along with a controller and returns the shape
 * of the item (either a node or an edge)
 */
export type ShapeResolverOptions = {
  animationController: BaseGraph['animationController'];
  shapes: BaseGraph['shapes'],
};
