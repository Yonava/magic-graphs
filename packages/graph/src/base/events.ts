import { DeepPartial, DeepReadonly } from 'ts-essentials';

import { EventMapToEventRegistry } from '../events/types.ts';
import { GraphSettings } from '../settings/index.ts';
import { GraphThemeName } from '../themes/index.ts';
import { GEdge, GNode } from '../types.ts';
import {
  ElementAdditionPayload,
  ElementRemovalPayload,
  ElementUpdatePayload,
} from './actions/types.ts';
import {
  ForbiddenEdgeKeyUpdates,
  ForbiddenNodeKeyUpdates,
  TransactionPayload,
} from './transaction/types.ts';

export type BaseEventMap = {
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
   * when a single node is {@link graph.actions.addNode | added} to the graph
   */
  onNodeAdded: (node: Readonly<GNode>) => void;
  /**
   * when a single node is {@link graph.actions.removeNode | removed} from the graph
   */
  onNodeRemoved: (
    removedNode: GNode['id'],
    removedEdges: Readonly<GEdge['id'][]>,
  ) => void;
  /**
   * when a single node is {@link Graph.actions.updateNode | updated}
   */
  onNodeUpdated: (
    node: Readonly<GNode>,
    previousValues: Readonly<Partial<Omit<GNode, ForbiddenNodeKeyUpdates>>>,
  ) => void;

  /**
   * when a single edge is {@link Graph.actions.addEdge | added} to the graph
   */
  onEdgeAdded: (edge: Readonly<GEdge>) => void;
  /**
   * when a single edge is {@link Graph.actions.removeEdge | removed} from the graph
   */
  onEdgeRemoved: (edge: GEdge['id']) => void;
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
   * when the {@link Graph.themeName | theme} of the graph has changed
   */
  onThemeChange: (newTheme: GraphThemeName, oldTheme: GraphThemeName) => void;
  /**
   * when the {@link Graph.settings | settings} of the graph have changed
   */
  onSettingsChange: (diff: DeepPartial<GraphSettings>) => void;
};

export type BaseEventRegistry = EventMapToEventRegistry<BaseEventMap>;

export const createBaseEventRegistry = (): BaseEventRegistry => ({
  onTransactionComplete: new Set(),
  onStructureChange: new Set(),

  onNodeAdded: new Set(),
  onNodeRemoved: new Set(),
  onNodeUpdated: new Set(),

  onEdgeAdded: new Set(),
  onEdgeRemoved: new Set(),
  onEdgeUpdated: new Set(),

  onElementsAdded: new Set(),
  onElementsRemoved: new Set(),
  onElementsUpdated: new Set(),

  onThemeChange: new Set(),
  onSettingsChange: new Set(),
});
