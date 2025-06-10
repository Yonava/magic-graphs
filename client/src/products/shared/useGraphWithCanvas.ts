import { useMagicCanvas } from "@canvas/index"
import type { MagicCanvasConfig, MagicCanvasProps } from "@canvas/types"
import type { GraphSettings } from "@graph/settings"
import type { Graph } from "@graph/types"
import { useGraph } from "@graph/useGraph"

export type GraphWithCanvas = {
  graph: Graph,
  canvas: MagicCanvasProps,
}

type UseGraphWithCanvas = (settings: Partial<GraphSettings>) => GraphWithCanvas

export const useGraphWithCanvas: UseGraphWithCanvas = (settings: Partial<GraphSettings> = {}) => {
  const config: MagicCanvasConfig = { draw: () => { } }

  const canvas = useMagicCanvas(config)
  const graph = useGraph(canvas, settings)

  config.draw = graph.draw

  return {
    canvas,
    graph,
  }
}