import { onMounted, defineComponent, h, watch } from "vue";
import { cross, rect, square } from "@shapes";
import type { SquareSchema } from "./shapes/square";
import type { CrossSchema } from "./shapes/cross";
import { getCtx } from "@utils/ctx";
import { generateId } from "@utils/id";
import type { RectSchema } from "./shapes/rect";
import type { BoundingBox, Coordinate } from "./types/utility";
import type { ShapeFactory } from "./types";
import type { AnchorPoint } from "./types/schema";

const atMarkerSchema = (at: Coordinate): CrossSchema => ({
  at,
  size: 5,
  fillColor: 'red',
  lineWidth: 1,
})

const atMarker = (at: Coordinate) => cross(atMarkerSchema(at))

const boundingBoxMarkerSchema = (bb: BoundingBox): RectSchema => ({
  at: bb.at,
  width: bb.width,
  height: bb.height,
  fillColor: 'transparent',
  stroke: {
    color: 'green',
    lineWidth: 1,
  }
})

const boundingBoxMarker = (bb: BoundingBox) => rect(boundingBoxMarkerSchema(bb))

const measuringStickSchema: SquareSchema = {
  at: { x: 0, y: 0 },
  size: 1008,
  fillColor: 'transparent',
  stroke: {
    color: 'black',
    lineWidth: 4,
    dash: [10, 10]
  },
}

const measuringStick = square(measuringStickSchema)

export type DocMarkingOptions = {
  showAtMarker: boolean,
  showBoundingBoxMarker: boolean,
  showMeasuringStick: boolean,
}

export const DOC_MARKING_DEFAULTS: DocMarkingOptions = {
  showAtMarker: false,
  showBoundingBoxMarker: false,
  showMeasuringStick: false,
}

export const DEFAULT_STORIES = {
  basic: {},
  markings: {
    args: {
      showAtMarker: true,
      showBoundingBoxMarker: true,
      showMeasuringStick: true,
    }
  },
  text: {
    args: {
      textArea: {
        textBlock: {
          content: 'Hi!',
          color: 'white',
        },
        color: 'blue'
      }
    }
  },
  stroke: {
    args: {
      stroke: {
        color: 'blue',
        lineWidth: 10,
      }
    }
  },
  rotation: {
    args: {
      rotation: Math.PI * 0.25 // 45deg in radians
    }
  },
  colorGradient: {
    args: {
      fillGradient: [
        {
          color: 'red',
          offset: 0,
        },
        {
          color: 'blue',
          offset: 0.99,
        }
      ]
    }
  }
} as const

export const createDocComponent = <T extends Record<string, unknown>>(factory: ShapeFactory<T>) =>
  defineComponent<T & DocMarkingOptions>({
    inheritAttrs: false,
    setup: (_, { attrs }) => {
      const props = attrs as T & DocMarkingOptions
      const canvasId = generateId()

      const drawPreview = () => {
        const canvas = document.getElementById(canvasId) as HTMLCanvasElement
        const ctx = getCtx(canvas);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const { showAtMarker, showBoundingBoxMarker, showMeasuringStick } = props

        if (showMeasuringStick) measuringStick.draw(ctx);
        const shape = factory(props);
        shape.draw(ctx)
        if (showAtMarker && 'at' in props) atMarker(props.at as AnchorPoint['at']).draw(ctx);
        if (showBoundingBoxMarker) boundingBoxMarker(shape.getBoundingBox()).draw(ctx)
      }

      onMounted(drawPreview);
      watch(() => ({ ...props }), drawPreview)

      return () => h('canvas', {
        id: canvasId,
        width: 400,
        height: 400,
      })
    }
  })