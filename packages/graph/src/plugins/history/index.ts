import type { BaseGraph } from '../../base';
import type { HistoryOption } from '../../base/types';
import type { GraphState } from '../../collab/types';
import type { GEdge, GNode } from '../../types';
import type { Coordinate } from '@magic/shapes/types/utility';
import { debounce } from '@magic/utils/debounce';

import { computed, ref } from 'vue';

import {
  DEFAULT_REDO_HISTORY_OPTIONS,
  DEFAULT_UNDO_HISTORY_OPTIONS,
} from './types';
import type {
  GNodeMoveRecord,
  HistoryRecord,
  RedoHistoryOptions,
  UndoHistoryOptions,
} from './types';

/**
 * the max number of history records to keep in the undo and redo stacks
 */
const MAX_HISTORY = 100;

/**
 * the minimum distance a node must be moved to be considered a move action
 * that should be added to the history stack
 */
const MIN_DISTANCE = 3;

export const useHistory = (graph: BaseGraph) => {
  const undoStack = ref<HistoryRecord[]>([]);
  const redoStack = ref<HistoryRecord[]>([]);

  const addToUndoStack = (record: HistoryRecord) => {
    undoStack.value.push(record);
    if (undoStack.value.length > MAX_HISTORY) {
      undoStack.value.shift();
    }
  };

  const addToRedoStack = (record: HistoryRecord) => {
    redoStack.value.push(record);
    if (redoStack.value.length > MAX_HISTORY) {
      redoStack.value.shift();
    }
  };

  const nodesPendingRemoval = ref<GNode[]>([]);
  const edgesPendingRemoval = ref<GEdge[]>([]);

  const processRemovals = () => {
    if (
      nodesPendingRemoval.value.length === 0 &&
      edgesPendingRemoval.value.length === 0
    )
      return;

    const nodeRecords = nodesPendingRemoval.value.map((node) => ({
      graphType: 'node' as const,
      data: node,
    }));

    const edgeRecords = edgesPendingRemoval.value.map((edge) => ({
      graphType: 'edge' as const,
      data: edge,
    }));

    addToUndoStack({
      action: 'remove',
      affectedItems: [...nodeRecords, ...edgeRecords],
    });

    nodesPendingRemoval.value = [];
    edgesPendingRemoval.value = [];
  };

  const debouncedProcessRemovals = debounce(processRemovals, 250);

  graph.subscribe('onNodeAdded', (node, { history }) => {
    if (!history) return;
    addToUndoStack({
      action: 'add',
      affectedItems: [
        {
          graphType: 'node',
          data: node,
        },
      ],
    });
  });

  graph.subscribe('onBulkNodeAdded', (nodes, { history }) => {
    if (!history) return;
    addToUndoStack({
      action: 'add',
      affectedItems: nodes.map((node) => ({
        graphType: 'node',
        data: node,
      })),
    });
  });

  graph.subscribe('onNodeRemoved', (removedNode, removedEdges, { history }) => {
    if (!history) return;

    const edgeRecords = removedEdges.map(
      (edge) =>
        ({
          graphType: 'edge',
          data: edge,
        }) as const,
    );

    addToUndoStack({
      action: 'remove',
      affectedItems: [
        {
          graphType: 'node',
          data: removedNode,
        },
        ...edgeRecords,
      ],
    });
  });

  graph.subscribe(
    'onBulkNodeRemoved',
    (removedNodes, removedEdges, { history }) => {
      if (!history) return;

      nodesPendingRemoval.value.push(...removedNodes);
      edgesPendingRemoval.value.push(...removedEdges);

      debouncedProcessRemovals();
    },
  );

  graph.subscribe('onEdgeLabelEdited', (edge, oldLabel, { history }) => {
    if (!history) return;
    addToUndoStack({
      action: 'edit',
      affectedItems: [
        {
          graphType: 'edge',
          data: {
            id: edge.id,
            from: oldLabel,
            to: edge.label,
          },
        },
      ],
    });
  });

  graph.subscribe('onEdgeAdded', (edge, { history }) => {
    if (!history) return;
    addToUndoStack({
      action: 'add',
      affectedItems: [
        {
          graphType: 'edge',
          data: edge,
        },
      ],
    });
  });

  graph.subscribe('onBulkEdgeAdded', (edges, { history }) => {
    if (!history) return;
    addToUndoStack({
      action: 'add',
      affectedItems: edges.map((edge) => ({
        graphType: 'edge',
        data: edge,
      })),
    });
  });

  graph.subscribe('onEdgeRemoved', (edge, { history }) => {
    if (!history) return;
    addToUndoStack({
      action: 'remove',
      affectedItems: [
        {
          graphType: 'edge',
          data: edge,
        },
      ],
    });
  });

  graph.subscribe('onBulkEdgeRemoved', (edges, { history }) => {
    if (!history) return;
    edgesPendingRemoval.value.push(...edges);

    debouncedProcessRemovals();
  });

  graph.subscribe(
    'onGraphLoaded',
    (previousState: GraphState, { history }: HistoryOption) => {
      if (!history) return;
      const previousNodes = previousState.nodes.map((node) => ({
        graphType: 'node' as const,
        data: node,
      }));
      const previousEdges = previousState.edges.map((edge) => ({
        graphType: 'edge' as const,
        data: edge,
      }));

      addToUndoStack({
        action: 'load',
        affectedItems: [
          ...graph.nodes.value.map((node) => ({
            graphType: 'node' as const,
            data: node,
          })),
          ...graph.edges.value.map((edge) => ({
            graphType: 'edge' as const,
            data: edge,
          })),
        ],
        previousState: {
          nodes: previousNodes,
          edges: previousEdges,
        },
      });
    },
  );

  const groupDrag = ref<{
    startingCoordinates: Coordinate;
    nodes: Readonly<GNode[]>;
  }>();

  graph.subscribe('onGroupDragStart', (nodes, startingCoordinates) => {
    groupDrag.value = {
      startingCoordinates,
      nodes,
    };
  });

  graph.subscribe('onGroupDrop', (nodes, endingCoordinates) => {
    if (!groupDrag.value)
      throw new Error("dropped a group we didn't know was being dragged");
    if (groupDrag.value.nodes.length !== nodes.length)
      throw new Error('group size mismatch');

    const dy = groupDrag.value.startingCoordinates.y - endingCoordinates.y;
    const dx = groupDrag.value.startingCoordinates.x - endingCoordinates.x;
    const c = Math.sqrt(dy ** 2 + dx ** 2);

    if (c < MIN_DISTANCE) return;

    addToUndoStack({
      action: 'move',
      affectedItems: groupDrag.value.nodes.map((node) => ({
        graphType: 'node',
        data: {
          id: node.id,
          from: { x: node.x + dx, y: node.y + dy },
          to: { x: node.x, y: node.y },
        },
      })),
    });
  });

  const movingNode = ref<GNodeMoveRecord['data']>();

  graph.subscribe('onNodeDragStart', (node) => {
    movingNode.value = {
      id: node.id,
      from: { x: node.x, y: node.y },
      to: { x: node.x, y: node.y },
    };
  });

  graph.subscribe('onNodeDrop', (node) => {
    if (!movingNode.value)
      throw new Error("dropped a node we didn't know was being dragged");
    if (movingNode.value.id !== node.id) throw new Error('node ID mismatch');
    movingNode.value.to = { x: node.x, y: node.y };

    const dy = movingNode.value.from.y - movingNode.value.to.y;
    const dx = movingNode.value.from.x - movingNode.value.to.x;
    const c = Math.sqrt(dy ** 2 + dx ** 2);

    if (c < MIN_DISTANCE) return;

    addToUndoStack({
      action: 'move',
      affectedItems: [
        {
          graphType: 'node',
          data: movingNode.value,
        },
      ],
    });
  });

  const undo = (options: Partial<UndoHistoryOptions> = {}) => {
    const record = undoStack.value.pop();
    if (!record) return;

    addToRedoStack(record);
    undoHistoryRecord(record);
    graph.emit('onUndo', record, {
      ...DEFAULT_UNDO_HISTORY_OPTIONS,
      ...options,
    });

    return record;
  };

  const redo = (options: Partial<RedoHistoryOptions> = {}) => {
    const record = redoStack.value.pop();
    if (!record) return;

    addToUndoStack(record);
    redoHistoryRecord(record);
    graph.emit('onRedo', record, {
      ...DEFAULT_REDO_HISTORY_OPTIONS,
      ...options,
    });

    return record;
  };

  const undoHistoryRecord = (record: HistoryRecord) => {
    if (record.action === 'load') {
      graph.load(
        {
          nodes: record.previousState.nodes.map((item) => item.data),
          edges: record.previousState.edges.map((item) => item.data),
        },
        { history: false },
      );
    } else if (record.action === 'add') {
      for (const item of record.affectedItems) {
        if (item.graphType === 'node') {
          graph.removeNode(item.data.id, { history: false });
        } else if (item.graphType === 'edge') {
          graph.removeEdge(item.data.id, { history: false });
        }
      }
    } else if (record.action === 'remove') {
      for (const item of record.affectedItems) {
        if (item.graphType === 'node') {
          graph.addNode(item.data, { history: false, focus: false });
        } else if (item.graphType === 'edge') {
          graph.addEdge(item.data, { history: false, focus: false });
        }
      }
    } else if (record.action === 'move') {
      for (const item of record.affectedItems) {
        if (item.graphType === 'node') {
          const { from, id } = item.data;
          graph.moveNode(id, {
            x: from.x,
            y: from.y,
          });
        }
      }
    } else if (record.action === 'edit') {
      for (const item of record.affectedItems) {
        graph.editEdgeLabel(item.data.id, item.data.from, { history: false });
      }
    }
  };

  const redoHistoryRecord = (record: HistoryRecord) => {
    if (record.action === 'load') {
      graph.load(
        {
          nodes: record.affectedItems
            .filter((item) => item.graphType === 'node')
            .map((item) => item.data),
          edges: record.affectedItems
            .filter((item) => item.graphType === 'edge')
            .map((item) => item.data),
        },
        { history: false },
      );
    } else if (record.action === 'add') {
      for (const item of record.affectedItems) {
        if (item.graphType === 'node') {
          graph.addNode(item.data, { history: false, focus: false });
        } else if (item.graphType === 'edge') {
          graph.addEdge(item.data, { history: false, focus: false });
        }
      }
    } else if (record.action === 'remove') {
      for (const item of record.affectedItems) {
        if (item.graphType === 'node') {
          graph.removeNode(item.data.id, { history: false });
        } else if (item.graphType === 'edge') {
          graph.removeEdge(item.data.id, { history: false });
        }
      }
    } else if (record.action === 'move') {
      for (const item of record.affectedItems) {
        if (item.graphType === 'node') {
          const { to, id } = item.data;
          graph.moveNode(id, {
            x: to.x,
            y: to.y,
          });
        }
      }
    } else if (record.action === 'edit') {
      for (const item of record.affectedItems) {
        graph.editEdgeLabel(item.data.id, item.data.to, { history: false });
      }
    }
  };

  const clearHistory = () => {
    undoStack.value = [];
    redoStack.value = [];
  };

  return {
    /**
     * undoes the last action and moves it to the redo stack
     */
    undo,
    /**
     * redoes the last undone action and moves it to the undo stack
     */
    redo,
    /**
     * true if there are actions to undo
     */
    canUndo: computed(() => undoStack.value.length > 0),
    /**
     * true if there are actions to redo
     */
    canRedo: computed(() => redoStack.value.length > 0),

    /**
     * stores past actions to revert
     */
    undoStack,
    /**
     * stores undone actions to reapply
     */
    redoStack,
    /**
     * adds a record to the undo stack
     */
    addToUndoStack,
    /**
     * adds a record to the redo stack
     */
    addToRedoStack,

    /**
     * clears the undo and redo stacks
     */
    clearHistory,
  };
};

export type GraphHistoryControls = ReturnType<typeof useHistory>;
export type GraphHistoryPlugin = {
  /**
   * controls for undoing and redoing actions in the graph
   * such as adding, removing, moving, and editing nodes and edges
   */
  history: GraphHistoryControls;
};
