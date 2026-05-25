import { BaseGraph } from '../base';
import { edgeHelpers } from './edge';
import { nodeHelpers } from './node';
import { EdgeHelpers, GraphHelpers, NodeHelpers } from './types';

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
