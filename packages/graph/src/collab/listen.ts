import { Fraction } from 'mathjs';

import type { Ref } from 'vue';

import type { Graph } from '../types.ts';
import type {
  CollabSocketEvents,
  CollaboratorMap,
  GraphSocket,
  GraphSocketEvents,
} from './types.ts';

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
    graph.actions.addNode(node, {
      broadcast: false,
      focus: false,
      history: false,
    });
  },
  nodeRemoved: (nodeId) => {
    graph.actions.removeNode(nodeId, { broadcast: false, history: false });
  },
  nodeMoved: (node) => {
    graph.actions.updateNode({ id: node.id, values: node });
  },
  edgeAdded: (edge) => {
    graph.actions.addEdge(edge, {
      broadcast: false,
      focus: false,
      history: false,
    });
  },
  edgeRemoved: (edgeId) => {
    graph.actions.removeEdge(edgeId, { broadcast: false, history: false });
  },
  edgeLabelEdited: (edgeId, newWeight) => {
    graph.actions.updateEdge(
      {
        id: edgeId,
        values: { weight: new Fraction(newWeight) },
      },
      {
        broadcast: false,
        history: false,
      },
    );
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
