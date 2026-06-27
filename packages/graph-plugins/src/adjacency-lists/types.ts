import { EventHub } from '@magic/graph-core-infra/events/createEventHub';
import { GraphGetters } from '@magic/graph-core-infra/getters/types';
import { CoreNode } from '@magic/graph-core-infra/types';
import { GraphPlugin } from '@magic/graph-plugins-shared/plugins/types';
import { CoreEventMap } from '@magic/graph-core/events';
import { CoreControls } from '@magic/graph-core/types';
import { CoreGetters } from '@magic/graph-core/getters';

import { Ref } from 'vue';

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
  'settings' | 'nodes' | 'edges' | 'helpers'
> & {
  events: EventHub<CoreEventMap>;
} & GraphGetters<CoreGetters>;

/**
 * a mapping of nodes to their neighbors
 */
export type AdjacencyList = Record<string, string[]>;

export type AdjacencyListsControls = {
  /**
   * the adjacency list using node ids as keys
   */
  standard: Ref<AdjacencyList>;
  /**
   * the adjacency list using node ids as keys and full node objects along with weights as values
   */
  weighted: Ref<WeightedAdjacencyList>;
  /**
   * the directed adjacency list using node ids as keys
   */
  directed: Ref<AdjacencyList>;
  /**
   * the undirected adjacency list using node ids as keys
   */
  undirected: Ref<AdjacencyList>;
};

export type AdjacencyListsPlugin = GraphPlugin<{
  controls: { adjacencyLists: AdjacencyListsControls };
}>;
