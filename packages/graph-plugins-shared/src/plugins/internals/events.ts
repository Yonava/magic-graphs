import { ReadonlyEventHub } from '@graph/primitives/events/createEventHub';
import { GenericEventMap } from '@graph/primitives/events/types';

type PluginEventHub<EventMap extends GenericEventMap> = {
  /** events for plugin */
  events: ReadonlyEventHub<EventMap>;
};

export type WithEvents<Controls, EventMap extends GenericEventMap> = Controls &
  PluginEventHub<EventMap>;
