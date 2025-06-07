import { onMounted, onUnmounted, type Ref } from 'vue'

export function useCanvasCamera(canvasRef: Ref<HTMLCanvasElement | undefined>) {
  let panX = 0
  let panY = 0

  const SENSITIVITY = 1

  function applyTransform(ctx: CanvasRenderingContext2D) {
    ctx.setTransform(2, 0, 0, 2, panX, panY)
  }

  function requestRedraw(canvas: HTMLCanvasElement) {
    const event = new CustomEvent('canvas-camera-moved')
    canvas.dispatchEvent(event)
  }

  const onWheel = (ev: WheelEvent) => {
    ev.preventDefault();

    const canvas = canvasRef.value;
    if (!canvas) return;

    panX -= ev.deltaX * SENSITIVITY
    panY -= ev.deltaY * SENSITIVITY

    requestRedraw(canvas)
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
    applyTransform,
    get pan() {
      return { x: panX, y: panY }
    },
    clear(ctx: CanvasRenderingContext2D) {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    },
  }
}
