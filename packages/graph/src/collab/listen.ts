import type { Graph } from '../types';

import type { Ref } from 'vue';

import type {
  CollabSocketEvents,
  CollaboratorMap,
  GraphSocket,
  GraphSocketEvents,
} from './types';

type SocketListenOptions = {
  graph: Graph;
  collaborators: Ref<CollaboratorMap>;
};

const collabListeners = ({
  collaborators,
}: SocketListenOptions): CollabSocketEvents => ({
  collaboratorJoined: (collaborator) => {
    collaborators.value[collaborator.id] = collaborator;
  },
  collaboratorLeft: (collaboratorId) => {
    delete collaborators.value[collaboratorId];
  },
  collaboratorMoved: ({ x, y, id }) => {
    const movedCollaborator = collaborators.value[id];
    if (!movedCollaborator) throw new Error('moving collaborator not found');
    movedCollaborator.mousePosition = { x, y };
  },
});

const graphListeners = ({ graph }: SocketListenOptions): GraphSocketEvents => ({
  nodeAdded: (node) => {
    graph.addNode(node, { broadcast: false, focus: false, history: false });
  },
  nodeRemoved: (nodeId) => {
    graph.removeNode(nodeId, { broadcast: false, history: false });
  },
  nodeMoved: (node) => {
    graph.moveNode(node.id, node, { broadcast: false });
  },
  edgeAdded: (edge) => {
    graph.addEdge(edge, { broadcast: false, focus: false, history: false });
  },
  edgeRemoved: (edgeId) => {
    graph.removeEdge(edgeId, { broadcast: false, history: false });
  },
  edgeLabelEdited: (edgeId, newLabel) => {
    graph.editEdgeLabel(edgeId, newLabel, { broadcast: false, history: false });
  },
});

const listeners = (options: SocketListenOptions) => ({
  ...graphListeners(options),
  ...collabListeners(options),
});

export const startListening = (
  socket: GraphSocket,
  options: SocketListenOptions,
) => {
  const eventHandlers = listeners(options);
  for (const [event, handler] of Object.entries(eventHandlers)) {
    // @ts-ignore ts cant handle Object.entries return type
    socket.on(event, handler);
  }
};
