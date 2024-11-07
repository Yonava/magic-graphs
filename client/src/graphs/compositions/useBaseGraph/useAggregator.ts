import { ref } from "vue"
import type { Ref } from "vue"
import type { Aggregator, UpdateAggregator } from "@graph/types"
import type { Emitter as GraphEventEmitter } from "@graph/events"

export type UseAggregatorOptions = {
  canvas: Ref<HTMLCanvasElement | null | undefined>
  emit: GraphEventEmitter
}

export const useAggregator = ({ canvas, emit }: UseAggregatorOptions) => {
  const aggregator = ref<Aggregator>([])
  const updateAggregator: UpdateAggregator[] = []

  /**
   * refresh the canvas
   *
   * @param repaintId - the id of the repaint event (for tracking)
   * @returns a function that will repaint the canvas
   */
  const repaint = (repaintId: string) => () => {
    if (!canvas.value) return
    const ctx = canvas.value.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

    const evaluateAggregator = updateAggregator.reduce<Aggregator>((acc, fn) => fn(acc), [])
    aggregator.value = [...evaluateAggregator.sort((a, b) => a.priority - b.priority)]

    const indexOfLastEdge = aggregator.value.findLastIndex(item => item.graphType === 'edge')
    const beforeLastEdge = aggregator.value.slice(0, indexOfLastEdge + 1)
    const afterLastEdge = aggregator.value.slice(indexOfLastEdge + 1)

    for (const item of beforeLastEdge) {
      item.shape.drawShape(ctx)
    }

    for (const item of beforeLastEdge) {
      item.shape.drawTextAreaMatte?.(ctx)
    }

    for (const item of beforeLastEdge) {
      item.shape.drawText?.(ctx)
    }

    for (const item of afterLastEdge) {
      item.shape.draw(ctx)
    }

    emit('onRepaint', ctx, repaintId)
  }

  /**
   * get all schema items at given coordinates
   *
   * @param x - the x coord
   * @param y - the y coord
   * @returns an array where the first item is the bottom most schema item and the last is the top most
   * @example // returns [node, nodeAnchor] where a nodeAnchor is sitting on top of a node
   * getSchemaItemsByCoordinates(200, 550)
   */
  const getSchemaItemsByCoordinates = (x: number, y: number) => {
    return aggregator.value
      .sort((a, b) => a.priority - b.priority)
      .filter(item => item.shape.shapeHitbox({ x, y }) || item.shape.textHitbox?.({ x, y }))
  }

  return {
    aggregator,
    updateAggregator,
    repaint,
    getSchemaItemsByCoordinates,
  }
}