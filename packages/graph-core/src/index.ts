import { nullThrows } from '@core/utils/assert';
import { createEventHub } from '@graph/primitives/events/createEventHub';
import type { CoreEdge, CoreNode } from '@graph/primitives/types';
import Fraction from 'fraction.js';

import { createCoreActions } from './actions/createCoreActions.ts';
import { createCoreEventRegistry } from './events.ts';
import { createHelpers } from './helpers/createHelpers.ts';
import { CoreOptions, DEFAULT_CORE_OPTIONS } from './options.ts';
import { createNodePositionStore } from './positions/createNodePositionStore.ts';
import { createCommitTransaction } from './transaction/createCommitTransaction.ts';
import { setupTransactionSucceeded } from './transaction/setupTransactionSucceeded.ts';
import type { CoreControls, CoreTransitControls } from './types.ts';
import { createEdgeWeightStore } from './weights/createEdgeWeightStore.ts';

export const core = (options: Partial<CoreOptions>) => {
  const metadata = {
    ...DEFAULT_CORE_OPTIONS,
    ...options,
  };

  const eventRegistry = createCoreEventRegistry();
  const coreEventHub = createEventHub(eventRegistry);

  const nodes: CoreNode[] = [];
  const edges: CoreEdge[] = [];

  const nodePositionStore = createNodePositionStore(coreEventHub);
  const edgeWeightStore = createEdgeWeightStore(coreEventHub, metadata);

  const getNode = (id: CoreNode['id']) =>
    nullThrows(
      nodes.find((n) => n.id === id),
      `node with id ${id} not found`,
    );
  const getEdge = (id: CoreEdge['id']) => {
    const edge = nullThrows(
      edges.find((e) => e.id === id),
      `edge with id ${id} not found`,
    );
    return { ...edge, weight: edgeWeightStore.get(id) };
  };

  const coreGetters = {
    getNode,
    getEdge,
  };

  const onTransactionSucceeded = setupTransactionSucceeded({
    edges,
    nodes,
    emit: coreEventHub.emit,
  });

  const commitTransaction = createCommitTransaction({
    getGraph: () => ({ nodes, edges }),
    getters: coreGetters,
    onTransactionSucceeded,
  });

  const coreActions = createCoreActions({
    commitTransaction,
    graph: {
      nodes,
      edges,
      positions: nodePositionStore,
      weights: edgeWeightStore,
    },
  });

  const coreControls: CoreControls = {
    nodes,
    edges,
    isNode: (id: string) => nodes.some((n) => n.id === id),
    isEdge: (id: string) => edges.some((e) => e.id === id),
    nodeIdToIndex: (id: string) => nodes.findIndex((n) => n.id === id),
    edgeIdToIndex: (id: string) => edges.findIndex((n) => n.id === id),
    helpers: createHelpers({
      edges,
      getEdge,
      getNode,
      metadata,
    }),
    metadata,
    positions: nodePositionStore,
    weights: edgeWeightStore,
  };

  const coreTransit: CoreTransitControls = {
    encode: () => {
      const edgeWeights = Array.from(
        edgeWeightStore._internal.edgeIdToEdgeWeight,
      ).map(([id, weight]) => ({ id, weight: weight.toString() }));

      const nodePositions = Array.from(
        nodePositionStore._internal.nodeIdToNodePosition,
      ).map(([id, position]) => ({ id, position }));

      return {
        nodes: [...nodes],
        edges: [...edges],
        edgeWeights,
        nodePositions,
      };
    },
    decode: (data) => {
      // --- CLEANUP EXISTING STATE ---
      const nodeIds = nodes.map((n) => n.id);
      const edgeIds = edges.map((e) => e.id);

      edgeWeightStore._internal.remove(edgeIds);
      nodePositionStore._internal.remove(nodeIds);

      commitTransaction({
        removeNodeIds: nodeIds,
      });

      // --- APPLY NEW STATE ---
      nodePositionStore._internal.add(data.nodePositions);
      edgeWeightStore._internal.add(
        data.edgeWeights.map((e) => ({
          id: e.id,
          weight: new Fraction(e.weight),
        })),
      );

      // adding and removing needs to be 2 separate transactions due to known bug:
      // https://github.com/Yonava/magic-graphs/issues/685
      commitTransaction({
        addNodes: data.nodes,
        addEdges: data.edges,
      });
    },
    validate: (data) => true,
  };

  return {
    controls: coreControls,
    actions: coreActions,
    getters: coreGetters,
    events: coreEventHub,
    transit: coreTransit,
  };
};
