import type { Ref } from "vue"
import type { Coordinate } from "@shape/types/utility"
import type { Camera } from "./camera"
import type { DrawPattern } from "./backgroundPattern"
import type { MagicCanvasOptions } from "."

export type DrawContent = (ctx: CanvasRenderingContext2D) => void

export type DrawFns = {
  content: Ref<DrawContent>,
  backgroundPattern: Ref<DrawPattern>
}

export type MagicCanvasProps = {
  canvas: Ref<HTMLCanvasElement | undefined>
  camera: Omit<Camera, 'cleanup'>,
  cursorCoordinates: Ref<Coordinate>,
  ref: {
    canvasRef: (canvas: HTMLCanvasElement) => void,
    cleanup: (canvas: HTMLCanvasElement) => void,
  },
  draw: DrawFns,
}

export type UseMagicCanvas = (options: MagicCanvasOptions) => MagicCanvasProps
