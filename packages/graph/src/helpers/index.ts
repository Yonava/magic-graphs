import { BaseGraph } from '../base/index.ts';
import { edgeHelpers } from './edge.ts';
import { nodeHelpers } from './node.ts';
import { EdgeHelpers, GraphHelpers, NodeHelpers } from './types.ts';

export const useGraphHelpers = (graph: BaseGraph): GraphHelpers => ({
  nodes: Object.keys(nodeHelpers).reduce(
    (acc, curr) => ({ ...acc, [curr]: (nodeHelpers as any)[curr](graph) }),
    {} as NodeHelpers,
  ),
  edges: Object.keys(edgeHelpers).reduce(
    (acc, curr) => ({ ...acc, [curr]: (edgeHelpers as any)[curr](graph) }),
    {} as EdgeHelpers,
  ),
});
