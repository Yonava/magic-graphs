import type { ShapeFactory } from "./types"

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

  return <T>(factory: ShapeFactory<T>): ShapeFactory<WithId<T>> => (schema) => {
    const shape = factory(schema)
    const { id } = shape
    return {
      ...shape,
      draw: (ctx) => {
        const boundingBox = shape.getBoundingBox()

        // console.log(id)

        // const serializedSchema = serializeSchema(schema)
        // const hasChanged = hasSchemaChanged(id, serializedSchema)

        // if (hasChanged || !canvasCache.has(id)) {
        // const offscreen = document.createElement('canvas');
        // offscreen.width = ctx.canvas.width;
        // offscreen.height = ctx.canvas.height;
        // const offscreenCtx = offscreen.getContext('2d')!;
        // shape.draw(offscreenCtx)
        // canvasCache.set(id, offscreen)
        // cache.set(id, serializedSchema)
        // }

        // const cachedCanvas = canvasCache.get(id)
        // if (!cachedCanvas) throw new Error('no cached canvas')
        // ctx.drawImage(cachedCanvas, 0, 0)

        shape.draw(ctx)
      },
      drawShape: (ctx) => {
        shape.drawShape(ctx)
      },
    }
  }
}