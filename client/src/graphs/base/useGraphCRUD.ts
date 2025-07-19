import type { Ref } from 'vue';
import type { GEdge, GNode } from '@graph/types';
import type { NodeMap, EdgeMap } from './useNodeEdgeMap';
import type { PartiallyPartial } from '@utils/types';
import {
  ADD_EDGE_DEFAULTS,
  ADD_EDGE_OPTIONS_DEFAULTS,
  BULK_ADD_EDGE_OPTIONS_DEFAULTS,
  ADD_NODE_OPTIONS_DEFAULTS,
  BULK_ADD_NODE_OPTIONS_DEFAULTS,
  MOVE_NODE_OPTIONS_DEFAULTS,
  REMOVE_EDGE_OPTIONS_DEFAULTS,
  REMOVE_NODE_OPTIONS_DEFAULTS,
  BULK_MOVE_NODE_OPTIONS_DEFAULTS,
} from './types';
import type {
  AddEdgeOptions,
  RemoveEdgeOptions,
  MoveNodeOptions,
  RemoveNodeOptions,
  AddNodeOptions,
  EditEdgeLabelOptions,
} from './types';
import { getConnectedEdges } from '@graph/helpers';
import { generateId } from '@utils/id';
import type { Emitter } from '@graph/events';
import { nodeLetterLabelGetter } from '@graph/labels';
import type { GraphSettings } from '@graph/settings';
import type { AggregatorProps } from './useAggregator';
import type { GraphAnimations } from './animations';
import type { Coordinate } from '@shape/types/utility';
import type { AutoAnimateControls } from '@shape/animation/autoAnimate';
import type { ActiveAnimationsMap } from '@shape/animation';
import type { MagicCanvasProps } from '@canvas/types';
import { getCtx } from '@utils/ctx';

type GraphCRUDOptions = {
  emit: Emitter;
  nodes: Ref<GNode[]>;
  edges: Ref<GEdge[]>;
  nodeMap: NodeMap;
  edgeMap: EdgeMap;
  settings: Ref<GraphSettings>;
  updateGraphAtMousePosition: () => void,
  updateAggregator: AggregatorProps['updateAggregator'],
  animations: GraphAnimations,
  autoAnimate: AutoAnimateControls,
  activeAnimations: ActiveAnimationsMap,
  draw: AggregatorProps['draw'],
  magicCanvas: MagicCanvasProps,
};

export type GNodeMoveInstruction = {
  /**
   * the target nodes `id`
   */
  nodeId: GNode['id'];
  /**
   * the coordinates the target node will be moved to
   */
  coords: Coordinate;
}

export const useGraphCRUD = ({
  nodes,
  edges,
  nodeMap,
  edgeMap,
  emit,
  settings,
  updateGraphAtMousePosition,
  updateAggregator,
  animations,
  autoAnimate,
  activeAnimations,
  draw,
  magicCanvas,
}: GraphCRUDOptions) => {
  // READ OPERATIONS

  /**
   * get a node by its id
   *
   * @param id
   * @returns the node or undefined if not found
   */
  const getNode = (id: GNode['id']) => nodeMap.value.get(id);

  /**
   * get an edge by its id
   *
   * @param id
   * @returns the edge or undefined if not found
   */
  const getEdge = (id: GEdge['id']) => edgeMap.value.get(id);

  // CREATE OPERATIONS

  /**
   * add a node to the graph
   *
   * @param node - the node to add
   * @param options - override default effects (onNodeAdded event)
   * @returns the added node or undefined if not added
   */
  const addNode = (
    node: Partial<GNode>,
    options: Partial<AddNodeOptions> = {},
  ) => {
    if (node?.id && getNode(node.id)) {
      console.warn(
        "prevented adding a node with an existing id, this shouldn't happen",
      );
      return;
    }

    const fullOptions = {
      ...ADD_NODE_OPTIONS_DEFAULTS,
      ...options,
    };

    const labelGetter =
      settings.value.newNodeLabelGetter ?? nodeLetterLabelGetter({ nodes });

    const newNode = {
      id: node.id ?? generateId(),
      label: node.label ?? labelGetter(),
      x: node.x ?? 0,
      y: node.y ?? 0,
    };

    if (fullOptions.animate) {
      animations.circle.nodeAdded.play({
        shapeId: newNode.id,
        runCount: 1,
      })
    }

    nodes.value.push(newNode);

    updateAggregator()
    updateGraphAtMousePosition()

    emit('onNodeAdded', newNode, fullOptions);
    emit('onStructureChange');

    return newNode;
  };

  const bulkAddNode = (
    nodes: Partial<GNode>[],
    options: Partial<AddNodeOptions> = {},
  ) => {
    if (nodes.length === 0) return;

    const fullOptions = {
      ...BULK_ADD_NODE_OPTIONS_DEFAULTS,
      ...options,
    };

    const createdNodes = [];

    for (const node of nodes) {
      const newNode = addNode(node, {
        focus: false,
        broadcast: false,
        history: false,
      });
      if (!newNode) continue;
      createdNodes.push(newNode);
    }

    if (createdNodes.length === 0) return;
    emit('onBulkNodeAdded', createdNodes, fullOptions);
  };

  /**
   * add an edge to the graph
   *
   * @param edge - the edge to add
   * @param options - override default effects (onEdgeAdded event)
   * @returns the added edge or undefined if not added
   */
  const addEdge = (
    edge: PartiallyPartial<GEdge, keyof typeof ADD_EDGE_DEFAULTS | 'id'>,
    options: Partial<AddEdgeOptions> = {},
  ) => {
    const fullOptions = {
      ...ADD_EDGE_OPTIONS_DEFAULTS,
      ...options,
    };

    const { isGraphDirected } = settings.value;

    const [fromNode, toNode] = [getNode(edge.from), getNode(edge.to)];
    if (!fromNode || !toNode) return;

    if (isGraphDirected) {
      const existingEdge = edges.value.find(
        (e) => e.from === edge.from && e.to === edge.to,
      );
      if (existingEdge) return;
    } else {
      const existingEdge = edges.value.find(
        (e) =>
          (e.from === edge.from && e.to === edge.to) ||
          (e.from === edge.to && e.to === edge.from),
      );
      if (existingEdge) return;
    }

    const newEdge: GEdge = {
      ...ADD_EDGE_DEFAULTS,
      id: generateId(),
      ...edge,
    };

    if (fullOptions.animate) {
      const selfRef = toNode.id === fromNode.id;
      const shape = selfRef ? 'uturn' : (isGraphDirected ? 'arrow' : 'line');
      animations[shape].edgeAdded.play({
        shapeId: newEdge.id,
        runCount: 1,
      })
    }

    edges.value.push(newEdge);

    updateAggregator()
    updateGraphAtMousePosition()

    emit('onEdgeAdded', newEdge, fullOptions);
    emit('onStructureChange');

    return newEdge;
  };

  const bulkAddEdge = (
    edges: PartiallyPartial<GEdge, keyof typeof ADD_EDGE_DEFAULTS | 'id'>[],
    options: Partial<AddEdgeOptions> = {},
  ) => {
    if (edges.length === 0) return;

    const fullOptions = {
      ...BULK_ADD_EDGE_OPTIONS_DEFAULTS,
      ...options,
    };

    const createdEdges: GEdge[] = [];

    for (const edge of edges) {
      const newEdge = addEdge(edge, {
        broadcast: false,
        history: false,
      });
      if (!newEdge) continue;
      createdEdges.push(newEdge);
    }

    if (createdEdges.length === 0) return;
    emit('onBulkEdgeAdded', createdEdges, fullOptions);
  };

  // UPDATE OPERATIONS

  /**
   * move a node to a new position (in place mutation)
   *
   * @param id the id of the node to move
   * @param coords the new coordinates (x, y)
   * @param options override default effects (onNodeMoved event)
   * @returns void
   */
  const moveNode = (
    id: GNode['id'],
    coords: Coordinate,
    options: Partial<MoveNodeOptions> = {},
  ) => {
    const node = getNode(id);
    if (!node) return;

    const fullOptions = {
      ...MOVE_NODE_OPTIONS_DEFAULTS,
      ...options,
    };

    node.x = coords.x;
    node.y = coords.y;
    emit('onNodeMoved', node, fullOptions);
  };

  const bulkMoveNode = (
    nodeMovements: GNodeMoveInstruction[],
    options: Partial<MoveNodeOptions> = {},
  ) => {
    const fullOptions = {
      ...BULK_MOVE_NODE_OPTIONS_DEFAULTS,
      ...options,
    };

    const finalizeFrame = autoAnimate.captureFrame(() => draw(getCtx(magicCanvas.canvas)))

    for (const { nodeId, coords } of nodeMovements) {
      moveNode(nodeId, coords, fullOptions)
    }

    finalizeFrame()
  }

  const editEdgeLabel = (
    edgeId: GEdge['id'],
    newLabel: GEdge['label'],
    options: Partial<EditEdgeLabelOptions> = {},
  ) => {
    const fullOptions = {
      ...ADD_EDGE_OPTIONS_DEFAULTS,
      ...options,
    };

    const edge = getEdge(edgeId);
    if (!edge) return;

    const oldLabel = edge.label;
    edge.label = newLabel;

    emit('onEdgeLabelEdited', edge, oldLabel, fullOptions);
    emit('onStructureChange');
  };

  // DELETE OPERATIONS

  /**
   * remove a node from the graph
   *
   * @param id - the id of the node to remove
   * @param options - override default effects (onNodeRemoved event)
   * @returns the removed node along with its removed edges or undefined if not removed
   */
  const removeNode = (
    id: GNode['id'],
    options: Partial<RemoveNodeOptions> = {},
  ) => {
    const removedNode = getNode(id);
    if (!removedNode) return;

    const fullOptions = {
      ...REMOVE_NODE_OPTIONS_DEFAULTS,
      ...options,
    };

    const edgesToRemove = getConnectedEdges(removedNode.id, {
      edges,
      getEdge,
      settings,
    });

    const removedEdges: GEdge[] = [];
    for (const edge of edgesToRemove) {
      const removed = removeEdge(edge.id, {
        broadcast: false,
        history: false,
      });
      if (!removed) continue;
      removedEdges.push(removed);
    }

    nodes.value = nodes.value.filter((n) => n.id !== removedNode.id);

    activeAnimations.delete(removedNode.id)

    updateAggregator()
    updateGraphAtMousePosition()

    emit('onNodeRemoved', removedNode, removedEdges, fullOptions);
    emit('onStructureChange');

    return [removedNode, removedEdges] as const;
  };

  const bulkRemoveNode = async (
    nodeIds: GNode['id'][],
    options: Partial<RemoveNodeOptions> = {},
  ) => {
    if (nodeIds.length === 0) return;

    const fullOptions = {
      ...REMOVE_NODE_OPTIONS_DEFAULTS,
      ...options,
    };

    const removedNodes: GNode[] = [];
    const removedEdges: GEdge[] = [];

    for (const nodeId of nodeIds) {
      const removed = removeNode(nodeId, {
        broadcast: false,
        history: false,
      });
      if (!removed) continue;
      const [removedNode, removedNodeEdges] = removed;
      removedNodes.push(removedNode);
      removedEdges.push(...removedNodeEdges);
    }

    if (removedNodes.length === 0) return;
    emit('onBulkNodeRemoved', removedNodes, removedEdges, fullOptions);
  };

  /**
   * remove an edge from the graph
   *
   * @param edgeId - the id of the edge to remove
   * @param options - override default effects (onEdgeRemoved event)
   * @returns the removed edge or undefined if not removed
   */
  const removeEdge = (
    edgeId: GEdge['id'],
    options: Partial<RemoveEdgeOptions> = {},
  ) => {
    const edge = getEdge(edgeId);
    if (!edge) return;

    const fullOptions = {
      ...REMOVE_EDGE_OPTIONS_DEFAULTS,
      ...options,
    };

    edges.value = edges.value.filter((e) => e.id !== edge.id);

    activeAnimations.delete(edge.id)

    updateAggregator()
    updateGraphAtMousePosition()

    emit('onEdgeRemoved', edge, fullOptions);
    emit('onStructureChange');

    return edge;
  };

  const bulkRemoveEdge = (
    edgeIds: GEdge['id'][],
    options: Partial<RemoveEdgeOptions> = {},
  ) => {
    if (edgeIds.length === 0) return;

    const fullOptions = {
      ...REMOVE_EDGE_OPTIONS_DEFAULTS,
      ...options,
    };

    const removedEdges: GEdge[] = [];

    for (const edgeId of edgeIds) {
      const removed = removeEdge(edgeId, {
        broadcast: false,
        history: false,
      });
      if (!removed) continue;
      removedEdges.push(removed);
    }

    if (removedEdges.length === 0) return;
    emit('onBulkEdgeRemoved', removedEdges, fullOptions);
    return removedEdges;
  };

  return {
    getNode,
    getEdge,

    addNode,
    addEdge,

    moveNode,
    bulkMoveNode,

    editEdgeLabel,

    removeNode,
    removeEdge,

    bulkAddNode,
    bulkRemoveNode,

    bulkAddEdge,
    bulkRemoveEdge,
  };
};
