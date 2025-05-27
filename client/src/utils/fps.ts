import { ref, onMounted, onUnmounted } from 'vue'

export function useFPS() {
  const fps = ref(0)

  let lastTime = performance.now()
  let frameId: number

  const update = () => {
    const now = performance.now()
    const delta = now - lastTime
    lastTime = now
    fps.value = Math.round(1000 / delta)
    frameId = requestAnimationFrame(update)
  }

  onMounted(() => {
    frameId = requestAnimationFrame(update)
  })

  onUnmounted(() => {
    cancelAnimationFrame(frameId)
  })

  return fps
}