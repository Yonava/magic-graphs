import { BaseGraphEventMap } from './types.ts';

export type GraphEventMapToBus<GraphEventMap> = Record<
  keyof GraphEventMap,
  Set<any>
>;

export type BaseGraphEventBus = GraphEventMapToBus<BaseGraphEventMap>;

/**
 * a version of Parameters<T> that removes constraints on T
 */
type PermissiveParams<T> = T extends (...args: infer P) => any ? P : never;

/**
 * generates a `subscribe`, `unsubscribe`, and `emit` function for
 * registering, deregistering and broadcasting graph events.
 */
export const generateSubscriber = <GraphEventMap extends BaseGraphEventMap>(
  eventBus: GraphEventMapToBus<GraphEventMap>,
) => ({
  /**
   * subscribe to an event to receive updates when it is emitted
   *
   * @param eventName the name of the event to subscribe to
   * @param eventCallback the callback function invoked when the event is emitted
   * @example subscribe('onNodeAdded', (node) => console.log(node)) // logs the node that was added
   */
  subscribe: <EventName extends keyof GraphEventMap>(
    eventName: EventName,
    eventCallback: GraphEventMap[EventName],
  ) => eventBus[eventName].add(eventCallback),
  /**
   * unsubscribe from an event to stop receiving updates when it is emitted
   *
   * @param eventName the name of the event to unsubscribe from
   * @param eventCallback the callback function to be removed from the event
   * @example unsubscribe('onNodeAdded', (node) => console.log(node)) // stops logging the node that was added
   */
  unsubscribe: <EventName extends keyof GraphEventMap>(
    eventName: EventName,
    eventCallback: GraphEventMap[EventName],
  ) => eventBus[eventName].delete(eventCallback),
  /**
   * push an event to all subscribers
   *
   * @param eventName the name of the event to push to
   * @param callbackArgs the arguments to be passed to the event's callbacks
   * @example emit('onNodeAdded', node) // calls all onNodeAdded callbacks with the node as an argument
   */
  emit: <EventName extends keyof GraphEventMap>(
    eventName: EventName,
    ...callbackArgs: PermissiveParams<GraphEventMap[EventName]>
  ) => {
    for (const callback of eventBus[eventName]) {
      callback(...callbackArgs);
    }
  },
});

/**
 * helper types for graph event architecture
 */

export type GenerateSubscriber<T extends BaseGraphEventMap> =
  typeof generateSubscriber<T>;

export type Subscriber<GraphEventMap extends BaseGraphEventMap> = ReturnType<
  GenerateSubscriber<GraphEventMap>
>['subscribe'];

export type Unsubscriber<GraphEventMap extends BaseGraphEventMap> = ReturnType<
  GenerateSubscriber<GraphEventMap>
>['unsubscribe'];

export type Emitter<GraphEventMap extends BaseGraphEventMap> = ReturnType<
  GenerateSubscriber<GraphEventMap>
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
