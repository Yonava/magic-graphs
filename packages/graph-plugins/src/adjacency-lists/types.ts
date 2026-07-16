import { CoreEventMap } from '@graph/core/events';
import { CoreGetters } from '@graph/core/getters';
import { CoreControls } from '@graph/core/types';
import { GraphPlugin } from '@graph/plugins-shared/plugins';
import { EventHub } from '@graph/primitives/events/createEventHub';
import { GraphGetters } from '@graph/primitives/getters/types';
import { StructuralEventMap } from '@graph/primitives/transactions/types';
import { CoreNode } from '@graph/primitives/types';
import { DeepReadonly } from 'ts-essentials';

/**
 * a mapping of nodes to their neighbors where neighbors are the full node objects
 * along with the weight of the edge connecting them to the key node
 */
export type WeightedAdjacencyList = Record<
  CoreNode['id'],
  (CoreNode & Pick<CoreGetters['getEdge'], 'weight'>)[]
>;

export type Graph = Pick<
  CoreControls,
  'metadata' | 'nodes' | 'edges' | 'helpers'
> & {
  events: EventHub<CoreEventMap & StructuralEventMap>;
} & GraphGetters<CoreGetters>;

/**
 * a mapping of nodes to their neighbors
 */
export type AdjacencyList = Record<string, string[]>;

export type AdjacencyListsControls = {
  /**
   * the adjacency list using node ids as keys
   */
  standard: () => DeepReadonly<AdjacencyList>;
  /**
   * the adjacency list using node ids as keys and full node objects along with weights as values
   */
  weighted: () => DeepReadonly<WeightedAdjacencyList>;
  /**
   * the directed adjacency list using node ids as keys
   */
  directed: () => DeepReadonly<AdjacencyList>;
  /**
   * the undirected adjacency list using node ids as keys
   */
  undirected: () => DeepReadonly<AdjacencyList>;
};

export type AdjacencyListsPlugin = GraphPlugin<{
  name: 'adjacencyLists';
  controls: AdjacencyListsControls;
}>;
