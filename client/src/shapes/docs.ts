import { cross, square } from "@shapes";
import type { Coordinate, ShapeFactory } from "./types";
import type { SquareSchema } from "./square";
import type { CrossSchema } from "./cross";
import { onMounted, type Ref } from "vue";
import { getCtx } from "@utils/ctx";

const atMarkerSchema = (at: Coordinate): CrossSchema => ({
  at,
  size: 5,
  color: 'red',
  lineWidth: 1,
})

const atMarker = (at: Coordinate) => cross(atMarkerSchema(at))

const measuringStickSchema: SquareSchema = {
  at: { x: 0, y: 0 },
  size: 1008,
  color: 'transparent',
  stroke: {
    color: 'black',
    width: 4,
    dash: [10, 10]
  },
}

const measuringStick = square(measuringStickSchema)

export const useShapePreview = <T extends { at: Coordinate }>(
  canvas: Ref<HTMLCanvasElement | undefined>,
  factory: ShapeFactory<T>,
  schema: T,
) => {
  const drawPreview = () => {
    const ctx = getCtx(canvas);
    measuringStick.draw(ctx);
    factory(schema).draw(ctx);
    atMarker(schema.at).draw(ctx);
  }

  onMounted(drawPreview);
}