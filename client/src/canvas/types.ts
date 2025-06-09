import type { Ref } from "vue"
import type { Coordinate } from "@shape/types/utility"
import type { Camera } from "./camera"

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
  draw: (ctx: CanvasRenderingContext2D) => void
}

export type UseMagicCanvas = (config: MagicCanvasConfig) => MagicCanvasProps
