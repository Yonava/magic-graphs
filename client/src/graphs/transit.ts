import type { Graph } from "./types";

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