import { UnionToIntersection } from 'ts-essentials';

import { CoreEventMap } from '../core/events.ts';
import { GraphCoreControls } from '../core/types.ts';
import { EventHub } from '../events/createEventHub.ts';
import { GenericEventMap } from '../events/types.ts';

type LoosePluginData = {
  controls: object;
  events: GenericEventMap;
};

/**
 * a plugin receives the upstream event hub (core's events plus everything
 * dependent plugins have already merged in) and is responsible for merging
 * its own events into it and returning the *same* hub, extended.
 *
 * there's no separate slot to stash a plugin's event map alongside the
 * upstream one (unlike `controls`, which is just flat intersection) because
 * the hub is a single threaded object: each plugin subscribes to it,
 * extends it, and hands the merged hub to the next plugin in the chain.
 * a plugin that returned a fresh, unmerged hub of just its own events
 * would silently drop every event upstream plugins (and core) emit, since
 * downstream plugins and consumers only ever see what's returned here.
 */
export type GraphPlugin<
  PluginData extends LoosePluginData,
  DependentPluginData extends LooseGraphPlugin[] = [],
> = (
  graph: GraphCoreControls & ExtractControls<DependentPluginData>,
  events: EventHub<CoreEventMap & ExtractEventMap<DependentPluginData>>,
) => {
  controls: PluginData['controls'];
  events: EventHub<CoreEventMap & PluginData['events']>;
};

/**
 * `CoreEventMap` is intersected into the return type here (not just the
 * `events` param) to keep the "merge yourself" contract honest at the type
 * level: every plugin must hand back a hub that still carries everything
 * core (and upstream plugins) emit, not just its own events. dropping this
 * intersection would let a plugin's loosely-typed return shape claim to
 * satisfy `LooseGraphPlugin` while actually losing `CoreEventMap` from the
 * threaded hub, which is exactly the failure mode `ExtractEventMap` relies
 * on this type to rule out.
 */
export type LooseGraphPlugin = (
  graph: GraphCoreControls,
  events: EventHub<CoreEventMap>,
) => {
  controls: LoosePluginData['controls'];
  events: EventHub<CoreEventMap & LoosePluginData['events']>;
};

export type RemoveArray<T> = T extends (infer F)[] ? F : T;

type ExtractData<TPlugin extends LooseGraphPlugin[]> = UnionToIntersection<
  ReturnType<RemoveArray<NoInfer<TPlugin>>>
>;

export type ExtractControls<TPlugin extends LooseGraphPlugin[]> =
  ExtractData<TPlugin> extends { controls: infer Controls } ? Controls : never;

export type ExtractEventMap<TPlugin extends LooseGraphPlugin[]> =
  TPlugin extends never[]
    ? // all plugins come pre-baked with core events
      CoreEventMap
    : UnionToIntersection<
        ReturnType<RemoveArray<NoInfer<TPlugin>>> extends {
          events: EventHub<infer EventMap>;
        }
          ? EventMap
          : never
      >;
