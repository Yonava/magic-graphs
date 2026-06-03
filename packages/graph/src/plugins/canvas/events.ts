import { DeepReadonly } from 'ts-essentials';

import { EventMapToEventBus } from '../../events/index.ts';
import { GraphAtMousePosition } from './types.ts';

/**
 * a standard mouse event along with extra graph related info
 * regarding the mouse position
 */
export type CanvasGraphMouseEvent = DeepReadonly<GraphAtMousePosition> & {
  /**
   * the native browser event that triggered this canvas graph event
   */
  event: MouseEvent;
};

export type CanvasEventMap = {
  /**
   * when the canvas is clicked on (proxies native dom event)
   */
  onClick: (ev: CanvasGraphMouseEvent) => void;
  /**
   * when the user clicks the mouse button on the canvas (proxies native dom event)
   */
  onMouseDown: (ev: CanvasGraphMouseEvent) => void;
  /**
   * when the user releases the mouse button on the canvas (proxies native dom event)
   */
  onMouseUp: (ev: CanvasGraphMouseEvent) => void;
  /**
   * when the user moves the mouse on the canvas (proxies native dom event)
   */
  onMouseMove: (ev: CanvasGraphMouseEvent) => void;
  /**
   * when the canvas is double clicked on (proxies native dom event)
   */
  onDblClick: (ev: CanvasGraphMouseEvent) => void;
  /**
   * when the canvas is right clicked on (proxies native dom event)
   */
  onContextMenu: (ev: CanvasGraphMouseEvent) => void;

  /**
   * when a key is pressed down on the canvas (proxies native dom event)
   */
  onKeyDown: (ev: KeyboardEvent) => void;
  /**
   * when a key is released on the canvas (proxies native dom event)
   */
  onKeyUp: (ev: KeyboardEvent) => void;

  /**
   * when the canvas is repainted
   *
   * **WARNING** items drawn to the canvas using ctx won't be tied to graphs internal state.
   * see {@link graph.canvas.aggregator | `aggregator`} if you need drawn item to integrate with graph APIs
   */
  onDraw: (ctx: CanvasRenderingContext2D) => void;
};

type CanvasEventBus = EventMapToEventBus<CanvasEventMap>;

export const createCanvasEventBus = (): CanvasEventBus => ({
  onClick: new Set(),
  onMouseDown: new Set(),
  onMouseUp: new Set(),
  onMouseMove: new Set(),
  onDblClick: new Set(),
  onContextMenu: new Set(),

  onKeyDown: new Set(),
  onKeyUp: new Set(),

  onDraw: new Set(),
});
