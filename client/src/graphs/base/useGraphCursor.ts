import type { Subscriber } from '@graph/events';
import type { SchemaItem } from '@graph/types';

import { computed, ref, watch } from 'vue';
import type { Ref } from 'vue';

import type { GraphAtMousePosition } from './types';

/**
 * cursor types supported by the browser
 */
export type Cursor =
  | 'auto'
  | 'default'
  | 'none'
  | 'context-menu'
  | 'help'
  | 'pointer'
  | 'progress'
  | 'wait'
  | 'cell'
  | 'crosshair'
  | 'text'
  | 'vertical-text'
  | 'alias'
  | 'copy'
  | 'move'
  | 'no-drop'
  | 'not-allowed'
  | 'grab'
  | 'grabbing'
  | 'e-resize'
  | 'n-resize'
  | 'ne-resize'
  | 'nw-resize'
  | 's-resize'
  | 'se-resize'
  | 'sw-resize'
  | 'w-resize'
  | 'ew-resize'
  | 'ns-resize'
  | 'nesw-resize'
  | 'nwse-resize'
  | 'col-resize'
  | 'row-resize'
  | 'all-scroll'
  | 'zoom-in'
  | 'zoom-out';

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
}: {
  subscribe: Subscriber;
  canvas: Ref<HTMLCanvasElement | null | undefined>;
  graphAtMousePosition: Ref<GraphAtMousePosition>;
}) => {
  const isMouseDown = ref(false);
  const graphCursorDisabled = ref(false);

  const graphToCursorMap = ref<
    Partial<Record<SchemaItem['graphType'], Cursor>>
  >({
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
    if (!canvas.value || graphCursorDisabled.value) return;
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
    /**
     * maps graph schema item types to browser cursor.
     * changing this mapping will change the cursor type when hovering over the graph.
     */
    graphToCursorMap,
    /**
     * activates a cursor select mode, where only the schema items that pass the
     * `predicate` will receive a pointer cursor.
     * everything else will receive the default cursor as long as this mode is active.
     * @param predicate - a predicate that determines, given a schema item, whether it is selectable.
     * @example activateCursorSelectMode((item) => item.graphType === 'node')
     * // in select mode
     * // only nodes will receive a pointer cursor
     */
    activateCursorSelectMode,
    /**
     * deactivates the cursor select mode. to be called after `activateCursorSelectMode`.
     * @example activateCursorSelectMode((item) => item.graphType === 'node')
     * // in select mode
     * deactivateCursorSelectMode()
     * // no longer in select mode
     */
    deactivateCursorSelectMode,
    /**
     * when the graph cursor is disabled, the cursor will always be the default cursor.
     */
    graphCursorDisabled,
  };
};
