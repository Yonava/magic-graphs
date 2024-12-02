import type {
  Graph,
  GNode,
  GEdge,
  MaybeGetter,
  SchemaItem,
} from '@graph/types'

/**
 * unwraps a MaybeGetter into a value of type T.
 *
 * @param value - the value to unwrap
 * @param args - the arguments to pass to the getter if the value is a getter
 * @returns T, which is UnwrapMaybeGetter<MaybeGetter<T, K>>
 * @example getValue(5) // 5
 * getValue(() => 5) // 5
 */
export const getValue = <T, K extends any[]>(value: MaybeGetter<T, K>, ...args: K) => {
  if (typeof value === 'function') {
    return (value as (...args: K) => T)(...args)
  }
  return value
}

/**
 * modifies the priority of the items passed in
 * such that the item with the id passed in has the highest priority
 * while preserving the order of the other items and their relative priorities.
 *
 * @param id - the id of the item to prioritize
 * @param items - loose subset of the items in the aggregator
 * @returns void - the items are modified in place
 */
export const prioritize = (id: SchemaItem['id'], items: SchemaItem[]) => {
  const itemToPrioritize = items.find(item => item.id === id)
  if (!itemToPrioritize) return

  const priorities = items.map(item => item.priority)
  const [max, min] = [Math.max(...priorities), Math.min(...priorities)]
  const range = max - min
  itemToPrioritize.priority = max

  items.sort((a, b) => a.priority - b.priority)

  const increment = Number((range / items.length).toFixed(2))
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) continue
    items[i].priority = min + (increment * i)
  }
}

/**
 * a helper that, when given the aggregator, will specifically prioritize a node
 *
 * @param id - the id of the node to prioritize
 * @param items - the aggregator array
 * @returns void - the items are modified in place
 */
export const prioritizeNode = (id: SchemaItem['id'], items: SchemaItem[]) => {
  const nodeSchemas = items.filter(item => item.graphType === 'node')
  prioritize(id, nodeSchemas)
}

/**
 * @description given two numbers, this function returns a random number between them (inclusive)
 *
 * @param min - the lowest number
 * @param max - the highest number
 * @returns a random number between min and max
 */
export const getRandomInRange = (min: number, max: number) => Math.round(Math.random() * (max - min) + min);

export const getRandomPointOnCanvas = (canvas: HTMLCanvasElement, buffer = 50) => ({
  x: getRandomInRange(buffer, canvas.width - buffer),
  y: getRandomInRange(buffer, canvas.height - buffer),
});

/**
 * get the nodes that an edge links together
 *
 * @param edgeId - the id of the edge
 * @param graph - the graph instance
 * @returns an array of the nodes that the edge links together [from, to]
 * @throws an error if the edge or the nodes it links are not in the graph
 * @example getConnectedNodes('abc123', graph)
 * // [{ id: 'dla4me', x: 0, y: 0 }, { id: 'def456', x: 100, y: 100 }]
 * // because edge 'abc123' links nodes 'dla4me' and 'def456'
 */
export const getConnectedNodes = (edgeId: GEdge['id'], graph: Pick<Graph, 'getNode' | 'getEdge'>) => {
  const edge = graph.getEdge(edgeId)
  if (!edge) throw new Error('edge not found')
  const from = graph.getNode(edge.from)
  const to = graph.getNode(edge.to)
  if (!from || !to) throw new Error('nodes not found')
  return [from, to]
}

/**
 * get all edges flowing into or out of a node
 *
 * @param nodeId - the id of the node
 * @param graph - the graph instance
 * @returns an array of edges that flow into or out of the node
 * @example getConnectedEdges('abc123', graph)
 * // [{ from: 'abc123', to: 'def456' }, { from: 'ghi789', to: 'abc123' }]
 */
export const getConnectedEdges = (
  nodeId: GNode['id'],
  graph: Pick<Graph, 'edges' | 'getEdge' | 'settings'>
) => graph.edges.value.filter(edge => {
  const isFlowingOut = isEdgeFlowingOutOfNode(edge.id, nodeId, graph)
  const isFlowingIn = isEdgeFlowingIntoNode(edge.id, nodeId, graph)
  return isFlowingOut || isFlowingIn
})

export const getDirectedInboundEdges = (nodeId: string, edges: GEdge[]) => {
  return edges.filter(edge => isDirectedEdgeFlowingIntoNode(edge, nodeId))
}

export const getUndirectedInboundEdges = (nodeId: string, edges: GEdge[]) => {
  return edges.filter(edge => isUndirectedEdgeFlowingIntoNode(edge, nodeId))
}

/**
 * gets the edges that flow into a node
 *
 * @param nodeId - the id of the node
 * @param graph - the graph instance
 * @returns an array of edges that flow into the node
 * @example getInboundEdges('abc123', graph)
 * // [{ from: 'ghi789', to: 'abc123' }]
 */
export const getInboundEdges = (
  nodeId: string,
  graph: Pick<Graph, 'settings' | 'edges'>
) => {
  const fn = graph.settings.value.isGraphDirected ? getDirectedInboundEdges : getUndirectedInboundEdges
  return fn(nodeId, graph.edges.value)
}

export const getDirectedOutboundEdges = (nodeId: string, edges: GEdge[]) => {
  return edges.filter(edge => isDirectedEdgeFlowingOutOfNode(edge, nodeId))
}

export const getUndirectedOutboundEdges = (nodeId: string, edges: GEdge[]) => {
  return edges.filter(edge => isUndirectedEdgeFlowingOutOfNode(edge, nodeId))
}

/**
 * gets the edges that flow out of a node
 *
 * @param nodeId - the id of the node
 * @param graph - the graph instance
 * @returns an array of edges that flow out of the node
 * @example getOutboundEdges('abc123', graph)
 * // [{ from: 'abc123', to: 'def456' }]
 */
export const getOutboundEdges = (
  nodeId: string,
  graph: Pick<Graph, 'settings' | 'edges'>
) => {
  const fn = graph.settings.value.isGraphDirected ? getDirectedOutboundEdges : getUndirectedOutboundEdges
  return fn(nodeId, graph.edges.value)
}

const isDirectedEdgeFlowingOutOfNode = (edge: GEdge, nodeId: GNode['id']) => {
  return edge.from === nodeId
}

const isUndirectedEdgeFlowingOutOfNode = (edge: GEdge, nodeId: GNode['id']) => {
  return edge.from === nodeId || edge.to === nodeId
}

/**
 * checks if an edge originates from a node
 *
 * @param edgeId - the id of the edge to check
 * @param nodeId - the id of the node to check
 * @param graph - the graph instance
 * @returns true if the edge flows out of the node, false otherwise
 */
export const isEdgeFlowingOutOfNode = (
  edgeId: GEdge['id'],
  nodeId: GNode['id'],
  graph: Pick<Graph, 'settings' | 'getEdge'>
) => {
  const edge = graph.getEdge(edgeId)
  if (!edge) throw new Error('edge not found')
  const isDirected = graph.settings.value.isGraphDirected
  const fn = isDirected ? isDirectedEdgeFlowingOutOfNode : isUndirectedEdgeFlowingOutOfNode
  return fn(edge, nodeId)
}

const isDirectedEdgeFlowingIntoNode = (edge: GEdge, nodeId: GNode['id']) => {
  return edge.to === nodeId
}

const isUndirectedEdgeFlowingIntoNode = (edge: GEdge, nodeId: GNode['id']) => {
  return edge.from === nodeId || edge.to === nodeId
}

/**
 * checks if an edge goes to a node
 *
 * @param edgeId - the id of the edge to check
 * @param nodeId - the id of the node to check
 * @param graph - the graph instance
 * @returns true if the edge flows out of the node, false otherwise
 */
export const isEdgeFlowingIntoNode = (
  edgeId: GEdge['id'],
  nodeId: GNode['id'],
  graph: Pick<Graph, 'settings' | 'getEdge'>
) => {
  const edge = graph.getEdge(edgeId)
  if (!edge) throw new Error('edge not found')
  const isDirected = graph.settings.value.isGraphDirected
  const fn = isDirected ? isDirectedEdgeFlowingIntoNode : isUndirectedEdgeFlowingIntoNode
  return fn(edge, nodeId)
}

/**
 * gets all the edges along a path connecting two nodes. only checks direct connections.
 *
 * @param node1Id - the first node
 * @param node2Id - the second node
 * @param graph - the graph instance
 * @returns an array of edges that connect the two nodes.
 */
export const getEdgesAlongPath = (
  node1Id: GNode['id'],
  node2Id: GNode['id'],
  graph: Pick<Graph, 'edges'>
) => {
  const isConnecting = (edge: GEdge) => {
    const fromNode1ToNode2 = edge.from === node1Id && edge.to === node2Id
    const fromNode2ToNode1 = edge.from === node2Id && edge.to === node1Id
    return fromNode1ToNode2 || fromNode2ToNode1
  }

  return graph.edges.value.filter(isConnecting)
}

/**
 * takes an edge and returns the weight of the edge
 *
 * @param edgeId the edge to get the weight of
 * @param graph the graph instance
 * @param fallbackWeight the weight to return if the label cannot be parsed as a number. defaults to 1
 * @returns the weight of the edge
 */
export const getEdgeWeight = (
  edgeId: GEdge['id'],
  graph: Pick<Graph, 'getTheme' | 'getEdge'>,
  fallbackWeight = 1
) => {
  const edge = graph.getEdge(edgeId)
  if (!edge) throw new Error('edge not found')
  const label = graph.getTheme('edgeText', edge)
  const weight = Number(label)
  return isNaN(weight) ? fallbackWeight : weight
}

export const getDirectedWeightBetweenNodes = (
  fromNodeId: GNode['id'],
  toNodeId: GNode['id'],
  graph: Pick<Graph, 'edges' | 'getEdge' | 'getTheme'>,
  fallbackWeight: number,
) => {
  const edgesAlongPath = getEdgesAlongPath(fromNodeId, toNodeId, graph)
  const connectingEdge = edgesAlongPath.find((e) => e.to === toNodeId)
  if (!connectingEdge) throw new Error('nodes are not adjacent')
  return getEdgeWeight(connectingEdge.id, graph, fallbackWeight)
}

export const getUndirectedWeightBetweenNodes = (
  fromNodeId: GNode['id'],
  toNodeId: GNode['id'],
  graph: Pick<Graph, 'edges' | 'getEdge' | 'getTheme'>,
  fallbackWeight: number,
) => {
  const [connectingEdge] = getEdgesAlongPath(fromNodeId, toNodeId, graph)
  if (!connectingEdge) throw new Error('nodes are not adjacent')
  return getEdgeWeight(connectingEdge.id, graph, fallbackWeight)
}

/**
 * takes two node ids of two adjacent nodes and returns the weight of the edge connecting them
 *
 * @param fromNodeId the id of the first node
 * @param toNodeId the id of the second node
 * @param graph the graph instance
 * @param fallbackWeight the weight to return if the label cannot be parsed as a number. defaults to 1
 * @returns the weight of the edge connecting the two nodes
 * @throws an error if the nodes are not adjacent
 */
export const getWeightBetweenNodes = (
  fromNodeId: GNode['id'],
  toNodeId: GNode['id'],
  graph: Pick<Graph, 'settings' | 'getTheme' | 'edges' | 'getEdge'>,
  fallbackWeight = 1
) => {
  const isDirected = graph.settings.value.isGraphDirected
  const fn = isDirected ? getDirectedWeightBetweenNodes : getUndirectedWeightBetweenNodes
  return fn(fromNodeId, toNodeId, graph, fallbackWeight)
}