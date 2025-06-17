import { generateId } from "@utils/id";
import type { GEdge, GNode, Graph } from "./types";

/**
 * all data that will be transferred between graph instances
 * when one graph instance is "projected" onto another.
 *
 * This could happen when a user:
 * - "goes with graph" from one product to another
 * - generates a share link/url that encodes a graph
 * - exports a graph
 */
export type GraphTransitData = {
  nodes: Graph['nodes']['value'],
  edges: Graph['edges']['value'],

  annotations: Graph['annotation']['annotations']['value'],

  cameraPanX: Graph['magicCanvas']['camera']['state']['panX']['value'],
  cameraPanY: Graph['magicCanvas']['camera']['state']['panY']['value'],
  cameraZoom: Graph['magicCanvas']['camera']['state']['zoom']['value'],
}

export const getTransitData = (g: Graph): GraphTransitData => ({
  nodes: g.nodes.value,
  edges: g.edges.value,

  annotations: g.annotation.annotations.value,

  cameraPanX: g.magicCanvas.camera.state.panX.value,
  cameraPanY: g.magicCanvas.camera.state.panY.value,
  cameraZoom: g.magicCanvas.camera.state.zoom.value,
})

export const setTransitData = (g: Graph, transitData: GraphTransitData) => {
  g.load({
    nodes: transitData.nodes,
    edges: transitData.edges
  })

  g.annotation.load(transitData.annotations)

  const { state: cameraState } = g.magicCanvas.camera
  cameraState.panX.value = transitData.cameraPanX
  cameraState.panY.value = transitData.cameraPanY
  cameraState.zoom.value = transitData.cameraZoom
}

const SCALE_FACTOR = 10
const DEFAULT_EDGE_LABEL = '1'

/**
 * takes graph transit data and converts it into an encoded string with lower fidelity
 * data that is perfect for sending over the wire or when transferring data is expensive.
 *
 * run encoded strings through {@link decodeCompressedTransitData} to decode!
 */
export const encodeCompressedTransitData = (data: GraphTransitData) => {
  const { nodes, edges, cameraPanX, cameraPanY, cameraZoom } = data

  const nodeData = nodes.reduce((compressedStr, node) => {
    const x = Math.round(node.x / SCALE_FACTOR)
    const y = Math.round(node.y / SCALE_FACTOR)
    return compressedStr + `-${node.label},${x},${y}`
  }, '').slice(1)

  const edgeData = edges.reduce((compressedStr, edge) => {
    const from = nodes.findIndex((n) => n.id === edge.from)
    const to = nodes.findIndex((n) => n.id === edge.to)
    // if most common default, no need to send it
    const label = edge.label === DEFAULT_EDGE_LABEL ? '' : `,${edge.label}`
    return compressedStr + `-${from},${to}` + label
  }, '').slice(1)

  const panX = Math.round(cameraPanX / SCALE_FACTOR)
  const panY = Math.round(cameraPanY / SCALE_FACTOR)
  const zoom = cameraZoom.toFixed(2)

  return `${nodeData}+${edgeData}+${panX}+${panY}+${zoom}`
}

/**
 * takes the compressed string returned by {@link encodeCompressedTransitData} and
 * resolves it back to usable graph transit data
 */
export const decodeCompressedTransitData = (encodedData: string): GraphTransitData => {
  const [
    encodedNodes,
    encodedEdges,
    encodedPanX,
    encodedPanY,
    encodedZoom,
  ] = encodedData.split('+')

  const nodes = encodedNodes.split('-').map((encodedNode): GNode => {
    const [encodedLabel, encodedX, encodedY] = encodedNode.split(',')
    return {
      id: generateId(),
      label: encodedLabel,
      x: Number(encodedX) * SCALE_FACTOR,
      y: Number(encodedY) * SCALE_FACTOR,
    }
  })

  const edges = encodedEdges.split('-').map((encodedEdge): GEdge => {
    const [encodedFrom, encodedTo, encodedLabel] = encodedEdge.split(',')
    console.log('label', encodedLabel)
    return {
      id: generateId(),
      label: encodedLabel ?? DEFAULT_EDGE_LABEL,
      from: nodes[Number(encodedFrom)].id,
      to: nodes[Number(encodedTo)].id,
    }
  })

  return {
    nodes,
    edges,
    cameraPanX: Number(encodedPanX) * SCALE_FACTOR,
    cameraPanY: Number(encodedPanY) * SCALE_FACTOR,
    cameraZoom: Number(encodedZoom),

    annotations: [],
  }
}