import { EventHub } from './createEventHub.ts';
import { GenericEventMap } from './types.ts';

export const UNRECOGNIZED_KEY = (eventName: string) =>
  `Event Hub Invoked With Event ${eventName} Unrecognized`;
const UNRECOGNIZED_KEY_WARNING = (eventName: string) =>
  console.warn(UNRECOGNIZED_KEY(eventName));

/**
 * Merges two event hubs into a single hub that delegates to both.
 *
 * ## Routing
 * - Events unique to one hub are routed to that hub only.
 * - Events present in both hubs are multicast to both.
 * - Emitting an unrecognized event logs a console.warn and is a no-op.
 *
 * ## Handler execution order
 * When an event is shared across both hubs, `emit` always fires hub1's
 * handlers before hub2's handlers. This is the only cross-hub ordering
 * guarantee — there is no mechanism to express "my handler in hub2 must
 * run before a handler in hub1."
 *
 * ## Handler priority limitation
 * Priority ordering (via `HandlerPriority.before`) is enforced within each
 * hub's internal handler list independently. The hub-level identifier (set at
 * hub creation time) is always available for `before` constraints because it
 * lives in the hub's closure. However, the merged `handle` method does
 * **not** forward `handlerId` (the 4th argument), so registration-level
 * identifiers (e.g. `"hubA:mousedown"`) cannot be targeted through the merged
 * interface.
 *
 * If registration-level priority is needed, register the handler directly on
 * the individual hub rather than through the merged interface.
 */
export const mergeEventHubs = <
  EventMap1 extends GenericEventMap,
  EventMap2 extends GenericEventMap,
>(
  hub1: EventHub<EventMap1>,
  hub2: EventHub<EventMap2>,
): EventHub<EventMap1 & EventMap2> => {
  const getKeyInHub = (eventName: keyof EventMap1 | keyof EventMap2) => {
    const keyInHub1 = hub1.keys.has(eventName as keyof EventMap1);
    const keyInHub2 = hub2.keys.has(eventName as keyof EventMap2);
    return { keyInHub1, keyInHub2 };
  };
  return {
    keys: new Set([...hub1.keys, ...hub2.keys]),
    subscribe: (eventName, eventCallback) => {
      const { keyInHub1, keyInHub2 } = getKeyInHub(eventName);
      if (keyInHub1) {
        hub1.subscribe(eventName as keyof EventMap1, eventCallback as any);
      }
      if (keyInHub2) {
        hub2.subscribe(eventName as keyof EventMap2, eventCallback as any);
      }
      if (!keyInHub1 && !keyInHub2) {
        UNRECOGNIZED_KEY_WARNING(eventName.toString());
      }
    },
    unsubscribe: (eventName, eventCallback) => {
      const { keyInHub1, keyInHub2 } = getKeyInHub(eventName);
      if (keyInHub1) {
        hub1.unsubscribe(eventName as keyof EventMap1, eventCallback as any);
      }
      if (keyInHub2) {
        hub2.unsubscribe(eventName as keyof EventMap2, eventCallback as any);
      }
      if (!keyInHub1 && !keyInHub2) {
        UNRECOGNIZED_KEY_WARNING(eventName.toString());
      }
    },
    unhandle: (eventName, eventCallback) => {
      const { keyInHub1, keyInHub2 } = getKeyInHub(eventName);
      if (keyInHub1) {
        hub1.unhandle(eventName as keyof EventMap1, eventCallback as any);
      }
      if (keyInHub2) {
        hub2.unhandle(eventName as keyof EventMap2, eventCallback as any);
      }
      if (!keyInHub1 && !keyInHub2) {
        UNRECOGNIZED_KEY_WARNING(eventName.toString());
      }
    },
    handle: (eventName, eventCallback, handlerId, priority) => {
      const { keyInHub1, keyInHub2 } = getKeyInHub(eventName);
      if (keyInHub1) {
        hub1.handle(
          eventName as keyof EventMap1,
          eventCallback as any,
          handlerId,
          priority,
        );
      }
      if (keyInHub2) {
        hub2.handle(
          eventName as keyof EventMap2,
          eventCallback as any,
          handlerId,
          priority,
        );
      }
      if (!keyInHub1 && !keyInHub2) {
        UNRECOGNIZED_KEY_WARNING(eventName.toString());
      }
    },
    emit: (eventName, ...callbackArgs) => {
      const { keyInHub1, keyInHub2 } = getKeyInHub(eventName);
      if (keyInHub1) {
        hub1.emit(eventName as keyof EventMap1, ...(callbackArgs as any));
      }
      if (keyInHub2) {
        hub2.emit(eventName as keyof EventMap2, ...(callbackArgs as any));
      }
      if (!keyInHub1 && !keyInHub2) {
        UNRECOGNIZED_KEY_WARNING(eventName.toString());
      }
    },
  };
};
