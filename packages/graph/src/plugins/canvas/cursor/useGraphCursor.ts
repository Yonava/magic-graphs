import { computed, ref, watch } from 'vue';

import { EventHub } from '../../../events/createEventHub.ts';
import { SchemaItem } from '../../../types.ts';
import { CanvasEventMap } from '../events.ts';
import { CanvasGraph } from '../types.ts';
import { GraphCursor, GraphTypeToCursor } from './types.ts';

type GraphCursorProps = {
  subscribe: EventHub<CanvasEventMap>['subscribe'];
  canvas: CanvasGraph['magicCanvas']['canvas'];
  graphAtMousePosition: CanvasGraph['graphAtMousePosition'];
};

/**
 * manages the cursor type when hovering over the graph
 *
 * @param subscribe - the event subscriber
 * @param canvas - the canvas element
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

  const isItemSelectable = ref<(item: SchemaItem) => boolean>();
  const inSelectMode = computed(() => !!isItemSelectable.value);

  const activateCursorSelectMode = (
    predicate: (item: SchemaItem) => boolean,
  ) => {
    isItemSelectable.value = predicate;
  };

  const deactivateCursorSelectMode = () => {
    isItemSelectable.value = undefined;
  };

  const getCursorType = (item: SchemaItem | undefined) => {
    if (!item) return 'default';

    if (inSelectMode.value) {
      const isSelectable = isItemSelectable.value?.(item) ?? false;
      return isSelectable ? 'pointer' : 'default';
    }

    const cursor = graphToCursorMap.value[item.graphType] ?? 'default';
    if (cursor === 'grab' && isMouseDown.value) return 'grabbing';

    return cursor;
  };

  const changeCursorType = () => {
    if (!canvas.value || disabled.value) return;
    const topItem = graphAtMousePosition.value.items.at(-1);
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
