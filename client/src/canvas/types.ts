import type { Ref } from "vue"
import type { Coordinate } from "@shape/types/utility"
import type { Camera } from "./camera"
import type { GraphCanvasColor } from "@product/shared/useGraphCanvasColor"

export type MagicCanvasProps = {
  canvas: Ref<HTMLCanvasElement | undefined>
  camera: Omit<Camera, 'cleanup'>,
  cursorCoordinates: Ref<Coordinate>,
  ref: {
    canvasRef: (canvas: HTMLCanvasElement) => void,
    cleanup: (canvas: HTMLCanvasElement) => void,
  }
}

export type MagicCanvasConfig = {
  draw: (ctx: CanvasRenderingContext2D) => void,
  patternColor: GraphCanvasColor['patternColor']
}

export type UseMagicCanvas = (config: MagicCanvasConfig) => MagicCanvasProps
