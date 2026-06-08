import { EventHub } from './createEventHub.ts';
import { GenericEventMap } from './types.ts';

export const UNRECOGNIZED_KEY = (eventName: string) =>
  `Event Hub Invoked With Event ${eventName} Unrecognized`;
const UNRECOGNIZED_KEY_WARNING = (eventName: string) =>
  console.warn(UNRECOGNIZED_KEY(eventName));

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
