import { ref, type Ref } from "vue"
import { type TransformOptions } from "../utils"
import { usePanAndZoom } from "./panZoom"

export type CameraPluggable = (canvas: Ref<HTMLCanvasElement | undefined>) => {
  getTransform: () => TransformOptions
}

export type CameraState = {
  panX: Ref<number>,
  panY: Ref<number>,
  zoom: Ref<number>,
}

export const useCameraState = (canvas: Ref<HTMLCanvasElement | undefined>) => {
  const state: CameraState = {
    panX: ref(0),
    panY: ref(0),
    zoom: ref(1),
  }

  return [usePanAndZoom(state)(canvas)]
}