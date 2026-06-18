import { UnionToIntersection } from 'ts-essentials';

import {
  CoreActions,
  GraphActions,
  MergeActions,
  PartialBaseActions,
} from '../core/actions/types.ts';
import { CoreEventMap } from '../core/events.ts';
import { CoreControls } from '../core/types.ts';
import { EventHub } from '../events/createEventHub.ts';
import { GenericEventMap } from '../events/types.ts';
import { GEdge, GNode } from '../types.ts';

type BaseGetters = {
  getNode: {};
  getEdge: {};
};

type CoreGetters = {
  getNode: GNode;
  getEdge: GEdge;
};

export type ResolveGetters<Getters extends Partial<BaseGetters>> = {
  getNode: 'getNode' extends keyof Getters
    ? NonNullable<Getters['getNode']>
    : {};
  getEdge: 'getEdge' extends keyof Getters
    ? NonNullable<Getters['getEdge']>
    : {};
};

type DistributeResolveGetters<PartialActions extends Partial<BaseGetters>> =
  PartialActions extends PartialActions
    ? ResolveGetters<PartialActions>
    : never;

export type MergeGetters<Getters extends Partial<BaseGetters>[]> =
  Getters extends []
    ? BaseGetters
    : {
        [ActionsField in keyof BaseGetters]: UnionToIntersection<
          DistributeResolveGetters<Getters[number]>[ActionsField]
        >;
      };

export type GraphGetters<Getters extends BaseGetters> = {
  getNode: (nodeId: string) => Getters['getNode'];
  getEdge: (edgeId: string) => Getters['getEdge'];
};

type LoosePluginData = {
  controls: object;
  events: GenericEventMap;
  getters: Partial<BaseGetters>;
  actions: PartialBaseActions;
  dependsOn: LooseGraphPlugin[];
};

type DefaultPluginData = {
  controls: {};
  events: {};
  getters: {};
  actions: {};
  dependsOn: [];
};

type ResolvePluginData<PartialPluginData> = {
  [K in keyof LoosePluginData]: K extends keyof PartialPluginData
    ? NonNullable<PartialPluginData[K]>
    : DefaultPluginData[K];
};

export type GraphPlugin<PluginData extends Partial<LoosePluginData>> =
  ResolvedGraphPlugin<ResolvePluginData<PluginData>>;

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
type ResolvedGraphPlugin<PluginData extends LoosePluginData> = (
  graph: CoreControls & ExtractControls<PluginData['dependsOn']>,
  events: EventHub<CoreEventMap & ExtractEventMap<PluginData['dependsOn']>>,
  actions: GraphActions<CoreActions>,
  getters: GraphGetters<CoreGetters>,
) => {
  controls: PluginData['controls'];
  events: EventHub<
    CoreEventMap &
      ExtractEventMap<PluginData['dependsOn']> &
      PluginData['events']
  >;
  getters: GraphGetters<MergeGetters<[PluginData['getters'], CoreGetters]>>;
  actions: GraphActions<MergeActions<[PluginData['actions'], CoreActions]>>;
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
  graph: any,
  events: EventHub<CoreEventMap>,
  actions: GraphActions<CoreActions>,
  getters: GraphGetters<CoreGetters>,
) => {
  controls: LoosePluginData['controls'];
  events: EventHub<CoreEventMap & LoosePluginData['events']>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actions: GraphActions<any>;
};

export type RemoveArray<T> = T extends (infer F)[] ? F : T;

type ExtractData<TPlugins extends LooseGraphPlugin[]> = UnionToIntersection<
  ReturnType<RemoveArray<NoInfer<TPlugins>>>
>;

export type ExtractControls<TPlugins extends LooseGraphPlugin[]> =
  ExtractData<TPlugins> extends { controls: infer Controls } ? Controls : never;

export type ExtractActions<TPlugins extends LooseGraphPlugin[]> =
  TPlugins extends never[]
    ? // all plugins come pre-baked with core events
      CoreActions
    : UnionToIntersection<
        ReturnType<RemoveArray<NoInfer<TPlugins>>> extends {
          actions: GraphActions<infer Actions>;
        }
          ? Actions
          : never
      >;

export type ExtractEventMap<TPlugins extends LooseGraphPlugin[]> =
  TPlugins extends never[]
    ? // all plugins come pre-baked with core events
      CoreEventMap
    : UnionToIntersection<
        ReturnType<RemoveArray<NoInfer<TPlugins>>> extends {
          events: EventHub<infer EventMap>;
        }
          ? EventMap
          : never
      >;

type PluginLifecycleControls = {
  /** Lifecycle management and runtime status */
  lifecycle: {
    /** Activates the plugin. */
    enable: () => void;
    /** Deactivates the plugin. */
    disable: () => void;
    // TODO implement: https://github.com/Yonava/magic-graphs/issues/702
    /** @returns true if the plugin is currently active */
    // isEnabled: () => boolean;
  };
};

export type WithLifecycle<PluginControls> = PluginControls &
  PluginLifecycleControls;
