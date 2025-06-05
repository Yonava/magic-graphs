import { ref, computed, type Ref } from "vue";
import type { Coordinate } from "@shape/types/utility";
import { MOUSE_BUTTONS } from "@graph/global";

/**
 * Handles panning canvas by scrolling the overflow of the canvas container.
 *
 * @param parentEl: the element to move the camera round
 *
 * @returns variables to check if panning is allowed or happening and a function to teleport camera
 */
export const useCanvasCamera = (parentEl: Ref<HTMLElement | undefined>) => {
  const allowPanning = ref(true);
  const isPanning = ref(false);
  const panStart = ref<Coordinate>({ x: 0, y: 0 });
  const scrollStart = ref<Coordinate>({ x: 0, y: 0 });

  const startPan = (event: MouseEvent) => {
    if (!allowPanning.value) return;
    if (!parentEl.value) return;
    if (event.button !== MOUSE_BUTTONS.middle) return;

    event.preventDefault();
    isPanning.value = true;
    panStart.value = { x: event.clientX, y: event.clientY };
    scrollStart.value = {
      x: parentEl.value.scrollLeft,
      y: parentEl.value.scrollTop,
    };
  };

  const pan = (event: MouseEvent) => {
    if (!isPanning.value || !parentEl.value) return;

    const dx = panStart.value.x - event.clientX;
    const dy = panStart.value.y - event.clientY;
    parentEl.value.scrollLeft = scrollStart.value.x + dx;
    parentEl.value.scrollTop = scrollStart.value.y + dy;
  };

  const endPan = () => {
    isPanning.value = false;
  };

  /**
   * Teleport the canvas to a specific position, centering those coords on the screen
   * @param options
   */
  const teleportTo = (options: ScrollToOptions) => {
    if (!parentEl.value) return;

    const { left = 0, top = 0, behavior } = options;
    const x = left - window.screen.width / 2;
    const y = top - window.screen.height / 2;
    parentEl.value.scrollTo({ left: x, top: y, behavior });
  };

  return {
    allowPanning,
    isPanning: computed(() => isPanning.value),

    teleportTo,

    startPan,
    pan,
    endPan,
  };
};
