/**
 * THIS HAS BEEN TEMPORARILY SHELVED AS IT LOWERS CANVAS IMAGE QUALITY AND I DONT HAVE
 * THE TIME TO FIGURE OUT WHY!
 */

// import { djb2Hasher, type DJB2Hash } from "@utils/hashing"
import type { ShapeFactory, WithId } from "./types"

// const serializeSchema = (schema: unknown) => djb2Hasher(JSON.stringify(schema))

/**
 * provides a wrapper around magic shapes that
 * increases shape rendering performance
 */
export const initShapeCache = () => {

  /**
   * maps a shapes provided schema `id` to a serialized version of
   * the schema in order to perform diffing
   */
  // const cache: Map<SchemaId, DJB2Hash> = new Map()
  // const canvasCache: Map<SchemaId, HTMLCanvasElement> = new Map();

  // const hasSchemaChanged = (schemaId: SchemaId, serializedSchema: DJB2Hash) => {
  //   const cachedSchema = cache.get(schemaId)
  //   return cachedSchema !== serializedSchema
  // }

  return <T>(factory: ShapeFactory<T>): ShapeFactory<WithId<T>> => (schema) => {
    const shape = factory(schema)

    // const drawWithCache: (fn: Shape['draw']) => Shape['draw'] = (drawFn) => (ctx) => {
    //   const boundingBox = shape.getBoundingBox()
    //   const serializedSchema = serializeSchema(schema)
    //   const hasChanged = hasSchemaChanged(schema.id, serializedSchema)

    //   if (hasChanged || !canvasCache.has(schema.id)) {
    //     const offscreen = document.createElement('canvas')
    //     const offscreenCtx = offscreen.getContext('2d')!
    //     offscreenCtx.save()
    //     offscreenCtx.translate(-boundingBox.at.x, -boundingBox.at.y)
    //     drawFn(offscreenCtx)
    //     offscreenCtx.restore()
    //     canvasCache.set(schema.id, offscreen)
    //     cache.set(schema.id, serializedSchema)
    //   }

    //   const cachedCanvas = canvasCache.get(schema.id)
    //   if (!cachedCanvas) throw new Error('no cached canvas')
    //   ctx.drawImage(cachedCanvas, boundingBox.at.x, boundingBox.at.y)
    // }

    return {
      ...shape,
      // draw: drawWithCache(shape.draw),
      // drawShape: drawWithCache(shape.drawShape),
    }
  }
}