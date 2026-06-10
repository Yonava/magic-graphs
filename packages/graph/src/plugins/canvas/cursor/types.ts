import { Ref } from 'vue';

import { CanvasElement } from '../types.ts';

/**
 * cursor types supported by the browser
 */
type Cursor =
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

export type GraphTypeToCursor = Partial<
  Record<CanvasElement['graphType'], Cursor>
>;

export type GraphCursor = {
  /**
   * maps graph schema item types to browser cursor.
   * changing this mapping will change the cursor type when hovering over the graph.
   */
  graphToCursorMap: Ref<GraphTypeToCursor>;
  /**
   * activates a cursor select mode, where only the canvas elements that pass the
   * `predicate` will receive a pointer cursor.
   * everything else will receive the default cursor as long as this mode is active.
   * @param predicate - a predicate that determines, given a schema item, whether it is selectable.
   * @example activateCursorSelectMode((item) => item.graphType === 'node')
   * // in select mode
   * // only nodes will receive a pointer cursor
   */
  activateCursorSelectMode: (
    predicate: (item: CanvasElement) => boolean,
  ) => void;
  /**
   * deactivates the cursor select mode. to be called after `activateCursorSelectMode`.
   * @example activateCursorSelectMode((item) => item.graphType === 'node')
   * // in select mode
   * deactivateCursorSelectMode()
   * // no longer in select mode
   */
  deactivateCursorSelectMode: () => void;
  /**
   * when the graph cursor is disabled, the cursor will always be the default cursor.
   */
  disabled: Ref<boolean>;
};
