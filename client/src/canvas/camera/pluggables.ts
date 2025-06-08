import { onMounted, onUnmounted, type Ref } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import type { TransformOptions } from './utils'

export type CameraPluggable = (canvasRef: Ref<HTMLCanvasElement | undefined>) => {
  getTransform: () => TransformOptions
}

export const usePan: CameraPluggable = (canvasRef) => {
  const panX = useLocalStorage('pan-x', 0)
  const panY = useLocalStorage('pan-y', 0)

  const SENSITIVITY = 5

  const onWheel = (ev: WheelEvent) => {
    ev.preventDefault();

    const canvas = canvasRef.value;
    if (!canvas) return;

    panX.value -= ev.deltaX * SENSITIVITY
    panY.value -= ev.deltaY * SENSITIVITY
  };

  onMounted(() => {
    const canvas = canvasRef.value
    if (!canvas) return

    canvas.addEventListener('wheel', onWheel, { passive: false })
  })

  onUnmounted(() => {
    const canvas = canvasRef.value
    if (!canvas) return

    canvas.removeEventListener('wheel', onWheel)
  })

  return {
    getTransform: () => ({ translateX: panX.value, translateY: panY.value })
  }
}
