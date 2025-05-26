import type { Shape, ShapeFactory } from "./types"

export type WithId<T> = T & {
  /**
   * optimized shapes require a unique id to track them across renders
   */
  id: string
}

const djb2Hasher = (str: string) => {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
  }
  return hash >>> 0;
}

type DJB2Hash = ReturnType<typeof djb2Hasher>

const serializeSchema = (schema: unknown) => djb2Hasher(JSON.stringify(schema))

/**
 * provides a wrapper around magic shapes that
 * increases shape rendering performance
 */
export const initShapeCache = () => {

  /**
   * maps a shapes provided schema `id` to a serialized version of
   * the schema in order to perform diffing
   */
  const cache: Map<string, DJB2Hash> = new Map()
  const canvasCache: Map<string, HTMLCanvasElement> = new Map();

  const hasSchemaChanged = (schemaId: string, serializedSchema: DJB2Hash) => {
    const cachedSchema = cache.get(schemaId)
    return cachedSchema !== serializedSchema
  }

  // const report = useLog()

  return <T>(factory: ShapeFactory<T>): ShapeFactory<WithId<T>> => (schema) => {
    const shape = factory(schema)

    const drawWithCache: (fn: Shape['draw']) => Shape['draw'] = (drawFn) => (ctx) => {
      const boundingBox = shape.getBoundingBox()
      const serializedSchema = serializeSchema(schema)
      const hasChanged = hasSchemaChanged(schema.id, serializedSchema)

      if (hasChanged || !canvasCache.has(schema.id)) {
        const offscreen = document.createElement('canvas')
        offscreen.width = boundingBox.width
        offscreen.height = boundingBox.height
        const offscreenCtx = offscreen.getContext('2d')!
        offscreenCtx.save()
        offscreenCtx.translate(-boundingBox.at.x, -boundingBox.at.y)
        drawFn(offscreenCtx)
        offscreenCtx.restore()
        canvasCache.set(schema.id, offscreen)
        cache.set(schema.id, serializedSchema)
      }

      const cachedCanvas = canvasCache.get(schema.id)
      if (!cachedCanvas) throw new Error('no cached canvas')
      ctx.drawImage(cachedCanvas, boundingBox.at.x, boundingBox.at.y)
    }

    return {
      ...shape,
      draw: drawWithCache(shape.draw),
      drawShape: drawWithCache(shape.drawShape),
    }
  }
}