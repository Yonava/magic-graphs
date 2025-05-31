import { ref, onMounted, onUnmounted } from 'vue'

export function useFPS() {
  const fps = ref(0)
  const frameTime = ref(0)
  const slowFrameCount = ref(0)
  const slowFrameRatio = ref(0)

  let frameId: number
  let intervalId: NodeJS.Timeout

  let lastMeasure = performance.now()
  let lastFrame = performance.now()
  let frames = 0
  let slowFrames = 0

  const SLOW_FRAME_THRESHOLD = 33.3 // ms

  const update = () => {
    const now = performance.now()
    const delta = now - lastFrame
    frameTime.value = delta
    lastFrame = now

    if (delta > SLOW_FRAME_THRESHOLD) {
      slowFrames++
    }

    frames++
    frameId = requestAnimationFrame(update)
  }

  const measure = () => {
    const now = performance.now()
    const delta = now - lastMeasure

    fps.value = Math.round((frames * 1000) / delta)
    slowFrameCount.value = slowFrames
    slowFrameRatio.value = frames > 0 ? slowFrames / frames : 0

    frames = 0
    slowFrames = 0
    lastMeasure = now
  }

  onMounted(() => {
    lastFrame = performance.now()
    lastMeasure = performance.now()
    frameId = requestAnimationFrame(update)
    intervalId = setInterval(measure, 500)
  })

  onUnmounted(() => {
    cancelAnimationFrame(frameId)
    clearInterval(intervalId)
  })

  return {
    fps,
    frameTime,
    slowFrameCount,
    slowFrameRatio,
  }
}
