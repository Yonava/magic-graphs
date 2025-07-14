import type { GraphEventMap } from './types';
export type { GraphEventMap } from './types';

/**
 * turns a type that maps an events callback fn type to an actual event bus
 */
export type EventMapToEventBus<T> = Record<keyof T, Set<any>>;

export type GraphEventBus = EventMapToEventBus<GraphEventMap>;

export type GraphEvent = keyof GraphEventMap;

/**
 * a version of Parameters<T> that removes constraints on T
 */
type PermissiveParams<T> = T extends (...args: infer P) => any ? P : never;

/**
  generates a "subscribe" and "unsubscribe" function for the event bus
  in order to registering, deregistering and broadcast graph events in a type-safe manner
*/
export const generateSubscriber = <T extends GraphEventMap>(
  eventBus: EventMapToEventBus<T>,
) => ({
  /**
   * lets you subscribe to a specific event to receive updates when it is emitted
   *
   * @param event the name of the event to subscribe to
   * @param fn the callback function to be called when the event is emitted
   * @example subscribe('onNodeAdded', (node) => console.log(node)) // logs the node that was added
   */
  subscribe: <K extends keyof T>(event: K, fn: T[K]) => eventBus[event].add(fn),
  /**
   * lets you unsubscribe from a specific event to stop receiving updates when it is emitted
   *
   * @param event the name of the event to unsubscribe from
   * @param fn the callback function to be removed from the event
   * @example unsubscribe('onNodeAdded', (node) => console.log(node)) // stops logging the node that was added
   */
  unsubscribe: <K extends keyof T>(event: K, fn: T[K]) =>
    eventBus[event].delete(fn),
  /**
   * lets you emit an event with the arguments corresponding to the event's callback function
   *
   * @param event the name of the event to emit
   * @param args the arguments to be passed to the event's callback functions
   * @example emit('onNodeAdded', node) // calls all onNodeAdded callbacks with the node as an argument
   */
  emit: <K extends keyof T>(event: K, ...args: PermissiveParams<T[K]>) => {
    for (const fn of eventBus[event]) {
      fn(...args);
    }
  },
});

/**
 * helper types for graph event architecture
 */

export type GenerateSubscriber<T extends GraphEventMap = GraphEventMap> =
  typeof generateSubscriber<T>;

export type Subscriber<T extends GraphEventMap = GraphEventMap> = ReturnType<
  GenerateSubscriber<T>
>['subscribe'];

export type Unsubscriber<T extends GraphEventMap = GraphEventMap> = ReturnType<
  GenerateSubscriber<T>
>['unsubscribe'];

export type Emitter<T extends GraphEventMap = GraphEventMap> = ReturnType<
  GenerateSubscriber<T>
>['emit'];

/**
 * @returns an empty event bus with all events initialized to empty sets
 */
export const getInitialEventBus = () => {
  const eventBus = {
    /**
     * BaseGraphEvents
     */
    onStructureChange: new Set(),

    onNodeAdded: new Set(),
    onBulkNodeAdded: new Set(),

    onNodeRemoved: new Set(),
    onBulkNodeRemoved: new Set(),

    onNodeMoved: new Set(),
    onBulkNodeMoved: new Set(),

    onEdgeAdded: new Set(),
    onBulkEdgeAdded: new Set(),

    onEdgeRemoved: new Set(),
    onBulkEdgeRemoved: new Set(),

    onEdgeLabelEdited: new Set(),

    onDraw: new Set(),
    onNodeHoverChange: new Set(),

    onGraphLoaded: new Set(),
    onGraphReset: new Set(),

    onClick: new Set(),
    onMouseDown: new Set(),
    onMouseUp: new Set(),
    onMouseMove: new Set(),
    onDblClick: new Set(),
    onContextMenu: new Set(),

    onKeyDown: new Set(),
    onKeyUp: new Set(),

    onThemeChange: new Set(),
    onSettingsChange: new Set(),

    /**
     * HistoryGraphEvents
     */
    onUndo: new Set(),
    onRedo: new Set(),

    /**
     * FocusGraphEvents
     */
    onFocusChange: new Set(),

    /**
     * DraggableGraphEvents
     */
    onNodeDragStart: new Set(),
    onNodeDrop: new Set(),

    /**
     * NodeAnchorGraphEvents
     */
    onNodeAnchorDragStart: new Set(),
    onNodeAnchorDrop: new Set(),

    /**
     * MarqueeGraphEvents
     */
    onGroupDragStart: new Set(),
    onGroupDrop: new Set(),

    onMarqueeBeginSelection: new Set(),
    onMarqueeEndSelection: new Set(),
  } as const satisfies GraphEventBus;

  return eventBus;
};
