import { computed, ref, watch } from 'vue';

import { EventHub } from '../../../events/createEventHub.ts';
import { CanvasEventMap } from '../events.ts';
import { CanvasElement, CanvasGraph } from '../types.ts';
import { GraphCursor, GraphTypeToCursor } from './types.ts';

type GraphCursorProps = {
  subscribe: EventHub<CanvasEventMap>['subscribe'];
  canvas: CanvasGraph['magicCanvas']['canvas'];
  graphAtMousePosition: CanvasGraph['graphUnderCursor'];
};

/**
 * manages the cursor type when hovering over the graph
 *
 * @param subscribe - the event subscriber
 * @param canvas - the HTML canvas element
 * @param graphAtMousePosition - the graph items at the mouse position
 * @returns the cursor manager
 */
export const useGraphCursor = ({
  subscribe,
  canvas,
  graphAtMousePosition,
}: GraphCursorProps): GraphCursor => {
  const isMouseDown = ref(false);
  const disabled = ref(false);

  const graphToCursorMap = ref<GraphTypeToCursor>({
    node: 'grab',
    edge: 'pointer',
    'node-anchor': 'grab',
    'encapsulated-node-box': 'move',
  });

  const isElementSelectable = ref<(element: CanvasElement) => boolean>();
  const inSelectMode = computed(() => !!isElementSelectable.value);

  const activateCursorSelectMode = (
    predicate: (element: CanvasElement) => boolean,
  ) => {
    isElementSelectable.value = predicate;
  };

  const deactivateCursorSelectMode = () => {
    isElementSelectable.value = undefined;
  };

  const getCursorType = (canvasElement: CanvasElement | undefined) => {
    if (!canvasElement) return 'default';

    if (inSelectMode.value) {
      const isSelectable = isElementSelectable.value?.(canvasElement) ?? false;
      return isSelectable ? 'pointer' : 'default';
    }

    const cursor = graphToCursorMap.value[canvasElement.graphType] ?? 'default';
    if (cursor === 'grab' && isMouseDown.value) return 'grabbing';

    return cursor;
  };

  const changeCursorType = () => {
    if (!canvas.value || disabled.value) return;
    const topItem = graphAtMousePosition.items.at(-1);
    canvas.value.style.cursor = getCursorType(topItem);
  };

  subscribe('onMouseDown', () => {
    isMouseDown.value = true;
    changeCursorType();
  });

  subscribe('onMouseUp', () => {
    isMouseDown.value = false;
    changeCursorType();
  });

  subscribe('onClick', changeCursorType);
  subscribe('onDblClick', changeCursorType);
  subscribe('onKeyUp', changeCursorType);
  subscribe('onKeyDown', changeCursorType);
  subscribe('onMouseMove', changeCursorType);

  watch(graphToCursorMap, changeCursorType, { deep: true });

  return {
    graphToCursorMap,
    activateCursorSelectMode,
    deactivateCursorSelectMode,
    disabled,
  };
};
