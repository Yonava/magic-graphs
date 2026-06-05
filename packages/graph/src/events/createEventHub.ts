import { createEventHandler } from './createEventHandler.ts';
import { EventMapToEventRegistry, GenericEventMap } from './index.ts';

/**
 * creates a `subscribe`, `unsubscribe`, and `emit` function for
 * registering, deregistering and broadcasting graph events.
 */
export const createEventHub = <EventMap extends GenericEventMap>(
  eventRegistry: EventMapToEventRegistry<EventMap>,
) => {
  const { register: registerHandler, fire: fireHandlers } =
    createEventHandler<EventMap>();
  return {
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
      eventRegistry[eventName].add(eventCallback);
    },
    /**
     * handle an event, and call consume to prevent lower priority handlers from receiving the event
     *
     * @param eventName the name of the event to handle
     * @param eventCallback the callback function invoked when the event is emitted
     * @param consume prevents the event from being handled by other handlers downstream (ie stops propagation)
     * @example handle('onNodeAdded', (node, consume) => {
     *  console.log(node)
     *  // we handled the event 😎
     *  consume()
     * })
     */
    handle: registerHandler,
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
      eventRegistry[eventName].delete(eventCallback);
    },
    /**
     * push an event to all subscribers
     *
     * @param eventName the name of the event to push to
     * @param callbackArgs the arguments to be passed to the event's callbacks
     * @example emit('onNodeAdded', node) // invokes all callbacks subscribed or handling onNodeAdded, with the node as an argument
     */
    emit: <EventName extends keyof EventMap>(
      eventName: EventName,
      ...callbackArgs: Parameters<EventMap[EventName]>
    ) => {
      for (const callback of eventRegistry[eventName]) {
        callback(...callbackArgs);
      }
      fireHandlers(eventName, ...callbackArgs);
    },
    /**
     * all the keys of the provided event map
     */
    keys: new Set(Object.keys(eventRegistry) as (keyof EventMap)[]),
  };
};

export type EventHub<EventMap extends GenericEventMap> = ReturnType<
  typeof createEventHub<EventMap>
>;
