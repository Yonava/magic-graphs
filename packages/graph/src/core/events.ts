import { DeepPartial, DeepReadonly } from 'ts-essentials';

import { EventMapToEventRegistry } from '../events/types.ts';
import { GraphSettings } from '../settings/index.ts';
import { GEdge, GNode } from '../types.ts';
import {
  ElementAdditionPayload,
  ElementRemovalPayload,
  ElementUpdatePayload,
} from './actions/types.ts';
import {
  NodePositioningSystemEventMap,
  createNodePositioningSystemEventRegistry,
} from './positions/createNodePositionStore.ts';
import {
  ForbiddenEdgeKeyUpdates,
  ForbiddenNodeKeyUpdates,
  TransactionPayload,
} from './transaction/types.ts';

export type CoreEventMap = {
  /**
   * fired once at the end of any atomic graph mutation batch.
   * downstream plugins (Animation, History, Broadcast) should hook into this.
   */
  onTransactionComplete: (payload: DeepReadonly<TransactionPayload>) => void;
  /**
   * when one of the following occurs:
   * - a node is {@link graph.actions.addNode | added} or {@link graph.actions.removeNode | removed}
   * - an edge is {@link graph.actions.actions.addEdge | added} or {@link Graph.removeEdge | removed}
   * - an edge label is {@link Graph.editEdgeLabel | edited}
   * - the {@link Graph.load | graph load} api is invoked with new nodes and edges
   * - the {@link Graph.reset | graph reset} api is invoked clearing all nodes and edges
   * - the `isGraphDirected` {@link Graph.settings | graph setting} is toggled
   */
  onStructureChange: () => void;

  /**
   * when nodes are added to the graph in a single transaction
   */
  onNodesAdded: (nodes: Readonly<GNode[]>) => void;
  /**
   * when nodes are removed from the graph in a single transaction
   */
  onNodesRemoved: (
    removedNodeIds: Readonly<GNode['id'][]>,
    removedEdgeIds: Readonly<GEdge['id'][]>,
  ) => void;
  /**
   * when a single node is {@link Graph.actions.updateNode | updated}
   */
  onNodeUpdated: (
    node: Readonly<GNode>,
    previousValues: Readonly<Partial<Omit<GNode, ForbiddenNodeKeyUpdates>>>,
  ) => void;

  /**
   * when one or more edges are {@link Graph.actions.addEdge | added} to the graph in a single transaction
   */
  onEdgesAdded: (edges: Readonly<GEdge[]>) => void;
  /**
   * when one or more edges are {@link Graph.actions.removeEdge | removed} from the graph in a single transaction
   */
  onEdgesRemoved: (edgeIds: Readonly<GEdge['id'][]>) => void;
  /**
   * when an edge is {@link Graph.actions.updateEdge | updated} from the graph
   */
  onEdgeUpdated: (
    edge: Readonly<GEdge>,
    previousValues: Readonly<Partial<Omit<GEdge, ForbiddenEdgeKeyUpdates>>>,
  ) => void;

  /**
   * when any nodes or edges are added
   */
  onElementsAdded: (additions: DeepReadonly<ElementAdditionPayload>) => void;
  /**
   * when any nodes or edges are deleted
   */
  onElementsRemoved: (removals: DeepReadonly<ElementRemovalPayload>) => void;
  /**
   * when any nodes or edges are updated
   */
  onElementsUpdated: (updates: DeepReadonly<ElementUpdatePayload>) => void;

  /**
   * when the {@link Graph.settings | settings} of the graph have changed
   */
  onSettingsChange: (diff: DeepPartial<GraphSettings>) => void;
} & NodePositioningSystemEventMap;

type CoreEventRegistry = EventMapToEventRegistry<CoreEventMap>;

export const createCoreEventRegistry = (): CoreEventRegistry => ({
  onTransactionComplete: new Set(),
  onStructureChange: new Set(),

  onNodesAdded: new Set(),
  onNodesRemoved: new Set(),
  onNodeUpdated: new Set(),

  onEdgesAdded: new Set(),
  onEdgesRemoved: new Set(),
  onEdgeUpdated: new Set(),

  onElementsAdded: new Set(),
  onElementsRemoved: new Set(),
  onElementsUpdated: new Set(),

  onSettingsChange: new Set(),
  ...createNodePositioningSystemEventRegistry(),
});
