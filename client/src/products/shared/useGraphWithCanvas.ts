import { useMagicCanvas } from "@canvas/index"
import type { MagicCanvasProps } from "@canvas/types"
import type { GraphSettings } from "@graph/settings"
import type { Graph } from "@graph/types"
import { useGraph } from "@graph/useGraph"
import { useGraphCanvasColor } from "./useGraphCanvasColor"
import type { StyleValue } from "vue"
import { cross } from "@shapes"
import { computed } from "vue"
import type { ComputedRef } from "vue"

type GraphCanvasCSS = { style: StyleValue }

export type GraphWithCanvas = {
  graph: Graph,
  canvas: MagicCanvasProps,
  css: ComputedRef<GraphCanvasCSS>,
}

type UseGraphWithCanvas = (settings: Partial<GraphSettings>) => GraphWithCanvas

export const useGraphWithCanvas: UseGraphWithCanvas = (settings: Partial<GraphSettings> = {}) => {
  const canvas = useMagicCanvas({ storageKey: settings.persistentStorageKey })
  const graph = useGraph(canvas, settings)
  const { bgColor, patternColor } = useGraphCanvasColor(graph);

  canvas.draw.content.value = graph.draw;
  canvas.draw.backgroundPattern.value = (ctx, at, alpha) => cross({
    at,
    size: 12,
    lineWidth: 1,
    fillColor: patternColor.value + alpha,
  }).draw(ctx);

  const css = computed<GraphCanvasCSS>(() => ({
    style: {
      backgroundColor: bgColor.value,
    }
  }))

  return {
    canvas,
    graph,
    css,
  }
}