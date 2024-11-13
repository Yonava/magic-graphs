import { ref } from "vue";
import type { Ref } from "vue";
import { useBaseGraph } from "@graph/compositions/useBaseGraph";
import type { GNode, GraphOptions } from "@graph/types";
import type { GNodeMoveRecord, HistoryRecord } from "./types";
import type { Coordinate } from "@shape/types";

/**
 * the max number of history records to keep in the undo and redo stacks
 */
const MAX_HISTORY = 100;

/**
 * the minimum distance a node must be moved to be considered a move action
 */
const MIN_DISTANCE = 3;


export const useHistoryGraph = (
  canvas: Ref<HTMLCanvasElement | undefined | null>,
  options: Partial<GraphOptions> = {},
) => {
  const graph = useBaseGraph(canvas, options);

  const undoStack = ref<HistoryRecord[]>([]);
  const redoStack = ref<HistoryRecord[]>([]);

  const addToUndoStack = (record: HistoryRecord) => {
    undoStack.value.push(record);
    if (undoStack.value.length > MAX_HISTORY) {
      undoStack.value.shift();
    }
  }

  const addToRedoStack = (record: HistoryRecord) => {
    redoStack.value.push(record);
    if (redoStack.value.length > MAX_HISTORY) {
      redoStack.value.shift();
    }
  }

  graph.subscribe('onNodeAdded', (node, { history }) => {
    if (!history) return;
    addToUndoStack({
      action: 'add',
      affectedItems: [{
        graphType: 'node',
        data: node,
      }]
    })
  });

  graph.subscribe('onBulkNodeAdded', (nodes, { history }) => {
    if (!history) return;
    addToUndoStack({
      action: 'add',
      affectedItems: nodes.map((node) => ({
        graphType: 'node',
        data: node,
      }))
    })
  });

  graph.subscribe('onNodeRemoved', (removedNode, removedEdges, { history }) => {
    if (!history) return;

    const edgeRecords = removedEdges.map((edge) => ({
      graphType: 'edge',
      data: edge,
    } as const));

    addToUndoStack({
      action: 'remove',
      affectedItems: [{
        graphType: 'node',
        data: removedNode,
      }, ...edgeRecords],
    })
  });

  graph.subscribe('onBulkNodeRemoved', (removedNodes, removedEdges, { history }) => {
    if (!history) return;

    const nodeRecords = removedNodes.map((node) => ({
      graphType: 'node',
      data: node,
    } as const));

    const edgeRecords = removedEdges.map((edge) => ({
      graphType: 'edge',
      data: edge,
    } as const));

    addToUndoStack({
      action: 'remove',
      affectedItems: [...nodeRecords, ...edgeRecords],
    })
  });

  graph.subscribe('onEdgeAdded', (edge, { history }) => {
    if (!history) return;
    addToUndoStack({
      action: 'add',
      affectedItems: [{
        graphType: 'edge',
        data: edge,
      }]
    })
  });

  graph.subscribe('onBulkEdgeAdded', (edges, { history }) => {
    if (!history) return;
    addToUndoStack({
      action: 'add',
      affectedItems: edges.map((edge) => ({
        graphType: 'edge',
        data: edge,
      }))
    })
  })

  graph.subscribe('onEdgeRemoved', (edge, { history }) => {
    if (!history) return;
    addToUndoStack({
      action: 'remove',
      affectedItems: [{
        graphType: 'edge',
        data: edge,
      }]
    })
  });

  graph.subscribe('onBulkEdgeRemoved', (edges, { history }) => {
    if (!history) return;
    addToUndoStack({
      action: 'remove',
      affectedItems: edges.map((edge) => ({
        graphType: 'edge',
        data: edge,
      }))
    })
  });

  const groupDrag = ref<{
    startingCoordinates: Coordinate,
    nodes: GNode[],
  }>();

  graph.subscribe('onGroupDragStart', (nodes, startingCoordinates) => {
    groupDrag.value = {
      startingCoordinates,
      nodes,
    }
  })

  graph.subscribe('onGroupDrop', (nodes, endingCoordinates) => {
    if (!groupDrag.value) throw new Error('dropped a group we didn\'t know was being dragged');
    if (groupDrag.value.nodes.length !== nodes.length) throw new Error('group size mismatch');

    const dy = groupDrag.value.startingCoordinates.y - endingCoordinates.y
    const dx = groupDrag.value.startingCoordinates.x - endingCoordinates.x
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
        }
      }))
    })
  });

  const movingNode = ref<GNodeMoveRecord['data']>();

  graph.subscribe('onNodeDragStart', (node) => {
    movingNode.value = {
      id: node.id,
      from: { x: node.x, y: node.y },
      to: { x: node.x, y: node.y },
    }
  })

  graph.subscribe('onNodeDrop', (node) => {
    if (!movingNode.value) throw new Error('dropped a node we didn\'t know was being dragged');
    if (movingNode.value.id !== node.id) throw new Error('node ID mismatch');
    movingNode.value.to = { x: node.x, y: node.y };

    const dy = movingNode.value.from.y - movingNode.value.to.y
    const dx = movingNode.value.from.x - movingNode.value.to.x
    const c = Math.sqrt(dy ** 2 + dx ** 2);

    if (c < MIN_DISTANCE) return;

    addToUndoStack({
      action: 'move',
      affectedItems: [{
        graphType: 'node',
        data: movingNode.value,
      }]
    })
  })

  const undo = () => {
    const record = undoStack.value.pop();
    if (!record) return;

    addToRedoStack(record);
    undoHistoryRecord(record);
    graph.emit('onUndo', record);
    return record;
  }

  const redo = () => {
    const record = redoStack.value.pop();
    if (!record) return;

    addToUndoStack(record);
    redoHistoryRecord(record);
    graph.emit('onRedo', record);
    return record;
  }

  const undoHistoryRecord = (record: HistoryRecord) => {
    if (record.action === 'add') {
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
    }
  }

  const redoHistoryRecord = (record: HistoryRecord) => {
    if (record.action === 'add') {
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
    }
  }

  const clearHistory = () => {
    undoStack.value = [];
    redoStack.value = [];
  }

  return {
    ...graph,

    /**
     * undoes the last action and moves it to the redo stack
     */
    undo,
    /**
     * redoes the last undone action and moves it to the undo stack
     */
    redo,

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
  }
};