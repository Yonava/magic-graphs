import { EventMapToEventRegistry } from '@graph/primitives/events/types';
import {
  ElementAdditionPayload,
  ElementRemovalPayload,
  TransactionPayload,
} from '@graph/primitives/transactions/types';
import { CoreEdge, CoreNode } from '@graph/primitives/types';
import { DeepReadonly } from 'ts-essentials';

import {
  NodePositionStoreEventMap,
  createNodePositionStoreEventRegistry,
} from './positions/events.ts';
import {
  EdgeWeightStoreEventMap,
  createEdgeWeightStoreEventRegistry,
} from './weights/events.ts';

export type CoreEventMap = {
  /**
   * triggered once at the end of any atomic graph mutation batch.
   * downstream plugins (Animation, History, Broadcast) should hook into this.
   */
  onTransactionComplete: (payload: DeepReadonly<TransactionPayload>) => void;
  /**
   * triggered when any nodes or edges are added or removed, or an an edge weight is changed
   */
  onStructureChange: () => void;

  /**
   * when nodes are added to the graph in a single transaction
   */
  onNodesAdded: (nodes: Readonly<CoreNode[]>) => void;
  /**
   * when nodes are removed from the graph in a single transaction
   */
  onNodesRemoved: (
    removedNodeIds: Readonly<CoreNode['id'][]>,
    removedEdgeIds: Readonly<CoreEdge['id'][]>,
  ) => void;

  /**
   * when one or more edges are {@link Graph.actions.addEdge | added} to the graph in a single transaction
   */
  onEdgesAdded: (edges: Readonly<CoreEdge[]>) => void;
  /**
   * when one or more edges are {@link Graph.actions.removeEdge | removed} from the graph in a single transaction
   */
  onEdgesRemoved: (edgeIds: Readonly<CoreEdge['id'][]>) => void;

  /**
   * when any nodes or edges are added
   */
  onElementsAdded: (additions: DeepReadonly<ElementAdditionPayload>) => void;
  /**
   * when any nodes or edges are deleted
   */
  onElementsRemoved: (removals: DeepReadonly<ElementRemovalPayload>) => void;
} & NodePositionStoreEventMap &
  EdgeWeightStoreEventMap;

export type CoreEventRegistry = EventMapToEventRegistry<CoreEventMap>;

export const createCoreEventRegistry = (): CoreEventRegistry => ({
  onTransactionComplete: new Set(),
  onStructureChange: new Set(),

  onNodesAdded: new Set(),
  onNodesRemoved: new Set(),

  onEdgesAdded: new Set(),
  onEdgesRemoved: new Set(),

  onElementsAdded: new Set(),
  onElementsRemoved: new Set(),

  ...createNodePositionStoreEventRegistry(),
  ...createEdgeWeightStoreEventRegistry(),
});
