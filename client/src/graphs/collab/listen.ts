import type { Ref } from "vue"
import type { Graph } from "@graph/types"
import type {
  CollaboratorMap,
  GraphSocketEvents,
  CollabSocketEvents,
  SocketEvents,
  GraphSocket,
} from "./types"
import type { Socket } from "socket.io-client"

type SocketListenOptions = {
  graph: Graph,
  collaborators: Ref<CollaboratorMap>
}

const collabListeners = ({ collaborators }: SocketListenOptions): CollabSocketEvents => ({
  'collaboratorJoined': (collaborator) => {
    collaborators.value[collaborator.id] = collaborator
  },
  'collaboratorLeft': (collaboratorId) => {
    delete collaborators.value[collaboratorId]
  },
  'collaboratorMoved': ({ x, y, id }) => {
    const movedCollaborator = collaborators.value[id]
    if (!movedCollaborator) throw new Error('moving collaborator not found')
    movedCollaborator.mousePosition = { x, y }
  }
})

const graphListeners = ({ graph }: SocketListenOptions): GraphSocketEvents => ({
  'nodeAdded': (node) => {
    graph.addNode(node, { broadcast: false, focus: false, history: false })
  },
  'nodeRemoved': (nodeId) => {
    graph.removeNode(nodeId, { broadcast: false, history: false })
  },
  'nodeMoved': (node) => {
    graph.moveNode(node.id, node, { broadcast: false })
  },
  'edgeAdded': (edge) => {
    graph.addEdge(edge, { broadcast: false, focus: false, history: false })
  },
  'edgeRemoved': (edgeId) => {
    graph.removeEdge(edgeId, { broadcast: false, history: false })
  },
  'edgeLabelEdited': (edgeId, newLabel) => {
    const edge = graph.getEdge(edgeId)
    if (!edge) throw new Error('edge not found')
    edge.label = newLabel
  },
})

const listeners = (options: SocketListenOptions) => ({
  ...graphListeners(options),
  ...collabListeners(options)
})

export const startListening = (
  socket: GraphSocket,
  options: SocketListenOptions
) => {
  const eventHandlers = listeners(options)
  for (const [event, handler] of Object.entries(eventHandlers)) {
    // @ts-ignore ts cant handle Object.entries return type
    socket.on(event, handler)
  }
}