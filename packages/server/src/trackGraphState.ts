import {
  GEdge,
  GNode,
  GraphState
} from "./clientTypes"

/**
 * maps the room id to the live version of the graph for that room
 */
const roomIdToGraphState: Record<string, GraphState> = {}

export const trackGraphState = () => {

  let roomId: string

  const setRoomId = (newRoomId: string) => {
    roomId = newRoomId
  }

  const getRoomId = () => {
    if (!roomId) console.warn('room id not set')
    return roomId
  }

  const getGraphState = () => {
    return roomIdToGraphState[getRoomId()]
  }

  const setGraphState = (graphState: GraphState) => {
    roomIdToGraphState[getRoomId()] = graphState
  }

  const deleteGraphState = () => {
    delete roomIdToGraphState[getRoomId()]
  }

  const updateEdge = (edgeId: GEdge['id'], edge: Partial<GEdge>) => {
    const graphState = roomIdToGraphState[getRoomId()]
    if (!graphState) return

    const edgeIndex = graphState.edges.findIndex((e) => e.id === edgeId)
    if (edgeIndex === -1) return

    graphState.edges[edgeIndex] = {
      ...graphState.edges[edgeIndex],
      ...edge
    }
  }

  const updateNode = (nodeId: GEdge['id'], node: Partial<GNode>) => {
    const graphState = roomIdToGraphState[getRoomId()]
    if (!graphState) return

    const nodeIndex = graphState.nodes.findIndex((n) => n.id === nodeId)
    if (nodeIndex === -1) return

    graphState.nodes[nodeIndex] = {
      ...graphState.nodes[nodeIndex],
      ...node
    }
  }

  const removeEdge = (edgeId: GEdge['id']) => {
    const graphState = roomIdToGraphState[getRoomId()]
    if (!graphState) return

    graphState.edges = graphState.edges.filter((e) => e.id !== edgeId)
  }

  const removeNode = (nodeId: GEdge['id']) => {
    const graphState = roomIdToGraphState[getRoomId()]
    if (!graphState) return

    graphState.nodes = graphState.nodes.filter((n) => n.id !== nodeId)
  }

  const addEdge = (edge: GEdge) => {
    const graphState = roomIdToGraphState[getRoomId()]
    if (!graphState) return

    graphState.edges.push(edge)
  }

  const addNode = (node: GNode) => {
    const graphState = roomIdToGraphState[getRoomId()]
    if (!graphState) return

    graphState.nodes.push(node)
  }

  return {
    getRoomId,
    setRoomId,

    getGraphState,
    setGraphState,
    deleteGraphState,

    addNode,
    removeNode,
    updateNode,

    addEdge,
    removeEdge,
    updateEdge,
  }
}