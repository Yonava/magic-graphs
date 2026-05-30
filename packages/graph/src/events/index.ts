import { BaseGraphEventMap } from './types.ts';

/**
 * turns a type that maps an events callback fn type to an actual event bus
 */
export type GraphEventMapToBus<T> = Record<keyof T, Set<any>>;

export type BaseGraphEventBus = GraphEventMapToBus<BaseGraphEventMap>;

/**
 * a version of Parameters<T> that removes constraints on T
 */
type PermissiveParams<T> = T extends (...args: infer P) => any ? P : never;

/**
  generates a "subscribe" and "unsubscribe" function for the event bus
  in order to registering, deregistering and broadcast graph events in a type-safe manner
*/
export const generateSubscriber = <T extends BaseGraphEventMap>(
  eventBus: GraphEventMapToBus<T>,
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

export type GenerateSubscriber<T extends BaseGraphEventMap> =
  typeof generateSubscriber<T>;

export type Subscriber<T extends BaseGraphEventMap> = ReturnType<
  GenerateSubscriber<T>
>['subscribe'];

export type Unsubscriber<T extends BaseGraphEventMap> = ReturnType<
  GenerateSubscriber<T>
>['unsubscribe'];

export type Emitter<T extends BaseGraphEventMap> = ReturnType<
  GenerateSubscriber<T>
>['emit'];

export const getInitialBaseEventBus = (): BaseGraphEventBus => ({
  onTransactionComplete: new Set(),
  onStructureChange: new Set(),

  onNodeAdded: new Set(),
  onNodeRemoved: new Set(),
  onNodeUpdated: new Set(),

  onEdgeAdded: new Set(),
  onEdgeRemoved: new Set(),
  onEdgeUpdated: new Set(),

  onElementsAdded: new Set(),
  onElementsRemoved: new Set(),
  onElementsUpdated: new Set(),

  onDraw: new Set(),
  onNodeHoverChange: new Set(),

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
});
