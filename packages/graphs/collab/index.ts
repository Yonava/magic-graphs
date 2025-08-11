import type { Graph } from '@graph/types';
import { getRandomElement } from '@utils/random';
import { useLocalStorage } from '@vueuse/core';
import { io } from 'socket.io-client';
import type { ProductInfo } from 'src/types';

import { computed, readonly, ref } from 'vue';

import { usePaintCollabTags } from './collabTag';
import { COLLAB_COLORS, SOCKET_URL } from './constants';
import { useSocketEmitters } from './emit';
import { startListening } from './listen';
import type {
  Collaborator,
  CollaboratorMap,
  CollaboratorProfile,
  GraphSocket,
} from './types';

export const myCollaboratorProfile = useLocalStorage<CollaboratorProfile>(
  'collab-profile',
  {
    name: '',
    color: getRandomElement(COLLAB_COLORS),
  },
);

type ConnectOptions = {
  /**
   * graph instance for the collab system to write new nodes/edges to when received
   * and to read from when sending new nodes/edges to other collaborators
   */
  graph: Graph;
  /**
   * room id to connect to
   */
  roomId: string;
  /**
   * product id that the graph belongs to
   */
  productId: ProductInfo['productId'];
};

const useCollab = () => {
  const meAsACollaborator = ref<Collaborator | undefined>();
  const socket = ref<GraphSocket | undefined>();
  const collaborators = ref<CollaboratorMap>({});
  const connectedRoomId = ref<string | undefined>();
  const graph = ref<Graph | undefined>();

  const paintCollabTag = usePaintCollabTags(collaborators);

  useSocketEmitters(socket, graph);

  const resetCollabState = () => {
    meAsACollaborator.value = undefined;
    connectedRoomId.value = undefined;
    collaborators.value = {};
    graph.value?.unsubscribe('onDraw', paintCollabTag);
    if (socket.value) {
      socket.value.disconnect();
      socket.value = undefined;
    }
  };

  /**
   * connects the user to the socket server.
   * @returns a promise that resolves with the socket instance when connected
   */
  const connectSocket = async () =>
    new Promise<GraphSocket>((res, rej) => {
      if (socket.value) return res(socket.value);

      const socketInstance = io(SOCKET_URL);

      socketInstance.on('connect', () => {
        resetCollabState();
        if (!socketInstance) throw new Error('this should never happen');
        res(socketInstance);
      });

      socketInstance.on('connect_error', (err) => {
        console.error('socket connection error', err);
        rej(err);
      });

      socketInstance.on('disconnect', () => {
        resetCollabState();
      });
    });

  /**
   * disconnects the socket which fires a side effect to reset the collab state
   */
  const disconnectSocket = () => {
    if (!socket.value) return;
    socket.value.disconnect();
  };

  /**
   * connect the user to a room with room id, product id, and a graph instance
   * @returns a promise that resolves when the user is connected to the room
   */
  const connectToRoom = async (options: ConnectOptions) => {
    if (socket.value) return console.warn('already connected to a room');

    socket.value = await connectSocket();
    if (!socket.value.id) throw new Error('socket id not found');

    graph.value = options.graph;
    connectedRoomId.value = options.roomId;

    meAsACollaborator.value = {
      id: socket.value.id,
      name: myCollaboratorProfile.value.name,
      // color: myCollaboratorProfile.value.color,
      color: getRandomElement(COLLAB_COLORS),
      mousePosition: { x: 0, y: 0 },
      productId: options.productId,
    };

    return new Promise<void>((res) => {
      if (!socket.value) throw new Error('socket not connected');
      if (!meAsACollaborator.value)
        throw new Error('meAsACollaborator not found');

      const joinOptions = {
        roomId: options.roomId,
        me: meAsACollaborator.value,
        graphState: {
          nodes: options.graph.nodes.value,
          edges: options.graph.edges.value,
        },
      };

      options.graph.subscribe('onDraw', paintCollabTag);
      startListening(socket.value, { graph: options.graph, collaborators });

      socket.value.emit('joinRoom', joinOptions, (collabMap, graphState) => {
        collaborators.value = collabMap;
        options.graph.load(graphState);
        res();
      });
    });
  };

  /**
   * disconnect from the current room
   */
  const disconnectFromRoom = disconnectSocket;

  /**
   * switch the product that the user is currently working on in the room
   */
  const switchProduct = async ({
    productId,
    graph,
  }: {
    productId: ProductInfo['productId'];
    graph: Graph;
  }) => {
    if (!socket.value) {
      console.warn('socket not connected, connect to a room first');
      return;
    }

    if (!connectedRoomId.value) throw new Error('connected room id not found');

    disconnectFromRoom();
    await connectToRoom({ graph, roomId: connectedRoomId.value, productId });
  };

  return {
    currentGraph: graph,
    meAsACollaborator: readonly(meAsACollaborator),
    collaborators: readonly(collaborators),
    connectedRoomId: readonly(connectedRoomId),

    connectToRoom,
    disconnectFromRoom,
    switchProduct,

    /**
     * whether the socket is connected and a collaborative session is live
     */
    isConnected: computed(() => !!socket.value),
    /**
     * number of collaborators in the room including self
     */
    collaboratorCount: computed(
      () => Object.keys(collaborators.value).length + 1,
    ),
  };
};

export const collabControls = useCollab();
