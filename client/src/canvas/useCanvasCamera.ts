import { onMounted, onUnmounted, type Ref } from 'vue'
import { getDevicePixelRatio } from './initCanvas'
import { useCoordinates } from './useCoordinates'

export function useCanvasCamera(canvasRef: Ref<HTMLCanvasElement | undefined>) {
  let panX = 0
  let panY = 0
  let isDragging = false
  let lastX = 0
  let lastY = 0
  let zoom = getDevicePixelRatio()
  const zoomOrigin = { x: 0, y: 0 };

  const { normal } = useCoordinates(canvasRef)

  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 5;

  function applyTransform(ctx: CanvasRenderingContext2D) {
    ctx.setTransform(zoom, 0, 0, zoom, panX, panY)
  }

  function screenToWorld(x: number, y: number) {
    return {
      x: (x - panX) / zoom,
      y: (y - panY) / zoom,
    }
  }

  function worldToScreen(x: number, y: number) {
    return {
      x: x * zoom + panX,
      y: y * zoom + panY,
    }
  }

  function requestRedraw(canvas: HTMLCanvasElement) {
    const event = new CustomEvent('canvas-camera-moved')
    canvas.dispatchEvent(event)
  }

  function onPointerDown(e: PointerEvent) {
    isDragging = true
    lastX = e.clientX
    lastY = e.clientY
  }

  function onPointerMove(e: PointerEvent) {
    if (!isDragging) return
    const dx = e.clientX - lastX
    const dy = e.clientY - lastY
    panX += dx
    panY += dy
    lastX = e.clientX
    lastY = e.clientY

    if (canvasRef.value) requestRedraw(canvasRef.value)
  }

  function onPointerUp() {
    isDragging = false
  }

  const onWheel = (ev: WheelEvent) => {
    const canvas = canvasRef.value;
    ev.preventDefault();

    if (!canvas) return;

    if (ev.ctrlKey) {

      const cursorX = normal.coords.value.x
      const cursorY = normal.coords.value.y

      const zoomChange = ev.deltaY < 0 ? 1.03 : 0.97;
      const newZoom = Math.min(
        MAX_ZOOM,
        Math.max(MIN_ZOOM, zoom * zoomChange),
      );
      if (newZoom <= MIN_ZOOM || newZoom >= MAX_ZOOM) return;

      zoomOrigin.x =
        cursorX - (cursorX - zoomOrigin.x) * (newZoom / zoom);
      zoomOrigin.y =
        cursorY - (cursorY - zoomOrigin.y) * (newZoom / zoom);

      zoom = newZoom;
    } else {
      panX -= ev.deltaX
      panY -= ev.deltaY
    }

    requestRedraw(canvas)
  };

  onMounted(() => {
    const canvas = canvasRef.value
    if (!canvas) return

    canvas.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    canvas.addEventListener('wheel', onWheel, { passive: false })
  })

  onUnmounted(() => {
    const canvas = canvasRef.value
    if (!canvas) return

    canvas.removeEventListener('pointerdown', onPointerDown)
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
    canvas.removeEventListener('wheel', onWheel)
  })

  return {
    applyTransform,
    screenToWorld,
    worldToScreen,
    get pan() {
      return { x: panX, y: panY }
    },
    get zoom() {
      return zoom
    },
    clear(ctx: CanvasRenderingContext2D) {
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    },
  }
}
