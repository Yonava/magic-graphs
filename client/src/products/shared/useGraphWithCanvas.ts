import { useMagicCanvas } from "@canvas/index"
import type { MagicCanvasConfig, MagicCanvasProps } from "@canvas/types"
import type { GraphSettings } from "@graph/settings"
import type { Graph } from "@graph/types"
import { useGraph } from "@graph/useGraph"
import { useGraphCanvasColor } from "./useGraphCanvasColor"
import type { StyleValue } from "vue"

export type GraphWithCanvas = {
  graph: Graph,
  canvas: MagicCanvasProps,
  css: { style: StyleValue },
}

type UseGraphWithCanvas = (settings: Partial<GraphSettings>) => GraphWithCanvas

export const useGraphWithCanvas: UseGraphWithCanvas = (settings: Partial<GraphSettings> = {}) => {
  const config: MagicCanvasConfig = { draw: () => { } }

  const canvas = useMagicCanvas(config)
  const graph = useGraph(canvas, settings)
  const { bgColor, patternColor } = useGraphCanvasColor(graph);

  config.draw = graph.draw

  const css = {
    style: {
      backgroundColor: bgColor.value,
    }
  } as const satisfies GraphWithCanvas['css']

  return {
    canvas,
    graph,
    css,
  }
}