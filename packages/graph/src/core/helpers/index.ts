import { edgeHelpers } from './edge.ts';
import { nodeHelpers } from './node.ts';
import {
  CoreGraphForHelpers,
  CoreGraphHelpers,
  EdgeHelpers,
  NodeHelpers,
} from './types.ts';

export const useGraphHelpers = (
  graph: CoreGraphForHelpers,
): CoreGraphHelpers => ({
  nodes: Object.keys(nodeHelpers).reduce(
    (acc, curr) => ({ ...acc, [curr]: (nodeHelpers as any)[curr](graph) }),
    {} as NodeHelpers,
  ),
  edges: Object.keys(edgeHelpers).reduce(
    (acc, curr) => ({ ...acc, [curr]: (edgeHelpers as any)[curr](graph) }),
    {} as EdgeHelpers,
  ),
});
