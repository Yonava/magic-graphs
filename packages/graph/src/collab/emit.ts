import type { GraphEventMap } from '@graph/events';
import type { Graph } from '@graph/types';

import { ref, watch } from 'vue';
import type { Ref } from 'vue';

import type { GraphSocket } from './types';

export const graphEmitters = (socket: GraphSocket): Partial<GraphEventMap> => ({
  onNodeAdded: (node, { broadcast }) => {
    if (!broadcast) return;
    socket.emit('nodeAdded', node);
  },
  onBulkEdgeAdded: (edges, { broadcast }) => {
    if (!broadcast) return;
    for (const edge of edges) {
      socket.emit('edgeAdded', edge);
    }
  },
  onNodeRemoved: (node, _, { broadcast }) => {
    if (!broadcast) return;
    socket.emit('nodeRemoved', node.id);
  },
  onBulkNodeRemoved: (nodes, edges, { broadcast }) => {
    if (!broadcast) return;
    for (const node of nodes) {
      socket.emit('nodeRemoved', node.id);
    }
    for (const edge of edges) {
      socket.emit('edgeRemoved', edge.id);
    }
  },
  onBulkEdgeRemoved: (edges, { broadcast }) => {
    if (!broadcast) return;
    for (const edge of edges) {
      socket.emit('edgeRemoved', edge.id);
    }
  },
  onNodeMoved: (node, { broadcast }) => {
    if (!broadcast) return;
    socket.emit('nodeMoved', node);
  },
  onEdgeAdded: (edge, { broadcast }) => {
    if (!broadcast) return;
    socket.emit('edgeAdded', edge);
  },
  onEdgeRemoved: (edge, { broadcast }) => {
    if (!broadcast) return;
    socket.emit('edgeRemoved', edge.id);
  },
  onEdgeLabelEdited: (edge, _, { broadcast }) => {
    if (!broadcast) return;
    socket.emit('edgeLabelEdited', edge.id, edge.label);
  },
  onMouseMove: ({ coords }) => {
    if (!socket.id) throw new Error('socket id not found');
    socket.emit('collaboratorMoved', { ...coords, id: socket.id });
  },
});

/**
 * takes events triggered from client, ie graph events for
 * when the user adds a node, moves a node, etc, and emits them
 * to the socket server to be broadcasted to other collaborators
 */
export const useSocketEmitters = (
  socket: Ref<GraphSocket | undefined>,
  graph: Ref<Graph | undefined>,
) => {
  const eventHandlers = ref<Partial<GraphEventMap>>({});

  const startEmitting = () => {
    for (const [event, handler] of Object.entries(eventHandlers.value)) {
      // @ts-expect-error ts cant handle Object.entries return type
      graph.value?.subscribe(event, handler);
    }
  };

  const stopEmitting = () => {
    for (const [event, handler] of Object.entries(eventHandlers.value)) {
      // @ts-expect-error ts cant handle Object.entries return type
      graph.value?.unsubscribe(event, handler);
    }
  };

  const handleStateChange = () => {
    stopEmitting();
    if (socket.value) {
      eventHandlers.value = graphEmitters(socket.value);
      startEmitting();
    }
  };

  watch(socket, handleStateChange);
};
