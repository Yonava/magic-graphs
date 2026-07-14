import { computed, onMounted, onUnmounted, ref } from 'vue';

import { Graph } from '../graph/types.ts';

export const useDisablePointerEvents = (graph: Graph) => {
  const disableUIPointerEvents = ref(false);

  const pointerEvents = computed(() =>
    disableUIPointerEvents.value ? 'pointer-events-none' : '',
  );

  const stopPointerEvents = () => (disableUIPointerEvents.value = true);
  const startPointerEvents = () => (disableUIPointerEvents.value = false);

  onMounted(() => {
    graph.events.subscribe('onMouseDown', stopPointerEvents);
    graph.events.subscribe('onMouseUp', startPointerEvents);
  });

  onUnmounted(() => {
    graph.events.unsubscribe('onMouseDown', stopPointerEvents);
    graph.events.unsubscribe('onMouseUp', startPointerEvents);
  });

  return pointerEvents;
};
