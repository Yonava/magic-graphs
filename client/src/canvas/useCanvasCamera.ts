import { onMounted, onUnmounted, type Ref } from 'vue'
import type { CanvasTransform } from './utils'

export type CameraPluggable = (canvasRef: Ref<HTMLCanvasElement | undefined>) => {
  getTransform: () => Partial<CanvasTransform>
}

export const usePan: CameraPluggable = (canvasRef) => {
  let panX = 0
  let panY = 0

  const SENSITIVITY = 1

  const onWheel = (ev: WheelEvent) => {
    ev.preventDefault();

    const canvas = canvasRef.value;
    if (!canvas) return;

    panX -= ev.deltaX * SENSITIVITY
    panY -= ev.deltaY * SENSITIVITY
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
    getTransform: () => ({ translateX: panX, translateY: panY })
  }
}
