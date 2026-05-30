import { EventMapToEventBus, GenericEventMap } from './index.ts';

/**
 * creates a `subscribe`, `unsubscribe`, and `emit` function for
 * registering, deregistering and broadcasting graph events.
 */
export const createEventHub = <EventMap extends GenericEventMap>(
  eventBus: EventMapToEventBus<EventMap>,
) => ({
  /**
   * subscribe to an event to receive updates when it is emitted
   *
   * @param eventName the name of the event to subscribe to
   * @param eventCallback the callback function invoked when the event is emitted
   * @example subscribe('onNodeAdded', (node) => console.log(node)) // logs the node that was added
   */
  subscribe: <EventName extends keyof EventMap>(
    eventName: EventName,
    eventCallback: EventMap[EventName],
  ) => {
    eventBus[eventName].add(eventCallback);
  },
  /**
   * unsubscribe from an event to stop receiving updates when it is emitted
   *
   * @param eventName the name of the event to unsubscribe from
   * @param eventCallback the callback function to be removed from the event
   * @example unsubscribe('onNodeAdded', (node) => console.log(node)) // stops logging the node that was added
   */
  unsubscribe: <EventName extends keyof EventMap>(
    eventName: EventName,
    eventCallback: EventMap[EventName],
  ) => {
    eventBus[eventName].delete(eventCallback);
  },
  /**
   * push an event to all subscribers
   *
   * @param eventName the name of the event to push to
   * @param callbackArgs the arguments to be passed to the event's callbacks
   * @example emit('onNodeAdded', node) // invokes all onNodeAdded callbacks with the node as an argument
   */
  emit: <EventName extends keyof EventMap>(
    eventName: EventName,
    ...callbackArgs: Parameters<EventMap[EventName]>
  ) => {
    for (const callback of eventBus[eventName]) {
      callback(...callbackArgs);
    }
  },
  /**
   * all the keys of the provided event map
   */
  keys: new Set(Object.keys(eventBus) as (keyof EventMap)[]),
});

export type EventHub<EventMap extends GenericEventMap> = ReturnType<
  typeof createEventHub<EventMap>
>;
