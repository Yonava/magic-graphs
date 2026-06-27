import {
  GraphActions,
  MergeActions,
  PartialBaseActions,
} from '@magic/graph-core-infra/actions/types';
import { EventHub } from '@magic/graph-core-infra/events/createEventHub';
import { GenericEventMap } from '@magic/graph-core-infra/events/types';
import {
  BaseGetters,
  GraphGetters,
  MergeGetters,
} from '@magic/graph-core-infra/getters/types';
import { CoreActions } from '@magic/graph/core/actions/types';
import { CoreEventMap } from '@magic/graph/core/events';
import { CoreControls } from '@magic/graph/core/types';
import { CoreGetters } from '@magic/graph/getters';
import { UnionToIntersection } from 'ts-essentials';

type LoosePluginData = {
  controls: object;
  events: GenericEventMap;
  getters: Partial<BaseGetters>;
  actions: PartialBaseActions;
  dependsOn: LooseGraphPlugin[];
  optionalDependsOn: LooseGraphPlugin[];
};

type DefaultPluginData = {
  controls: {};
  events: {};
  getters: {};
  actions: {};
  dependsOn: [];
  optionalDependsOn: [];
};

type ResolvePluginData<PartialPluginData> = {
  [K in keyof LoosePluginData]: K extends keyof PartialPluginData
    ? NonNullable<PartialPluginData[K]>
    : DefaultPluginData[K];
};

export type GraphPlugin<PluginData extends Partial<LoosePluginData>> =
  ResolvedGraphPlugin<ResolvePluginData<PluginData>>;

type GraphPluginOptions<PluginData extends LoosePluginData> = {
  controls: CoreControls &
    ExtractControls<PluginData['dependsOn']> &
    (PluginData['optionalDependsOn'] extends never[]
      ? {}
      : Partial<ExtractControls<PluginData['optionalDependsOn']>>);
  events: EventHub<
    CoreEventMap &
      ExtractEventMap<PluginData['dependsOn']> &
      (PluginData['optionalDependsOn'] extends never[]
        ? {}
        : ExtractEventMap<PluginData['optionalDependsOn']>)
  >;
  actions: GraphActions<CoreActions>;
  getters: GraphGetters<CoreGetters>;
};

/** get the options in a plugins parameters  */
export type PluginOptions<Plugin extends LooseGraphPlugin> =
  Parameters<Plugin>[0];

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
  options: GraphPluginOptions<PluginData>,
) => {
  controls: PluginData['controls'];
  events: EventHub<
    CoreEventMap &
      ExtractEventMap<PluginData['dependsOn']> &
      (PluginData['optionalDependsOn'] extends never[]
        ? {}
        : ExtractEventMap<PluginData['optionalDependsOn']>) &
      PluginData['events']
  >;
  getters: GraphGetters<MergeGetters<[PluginData['getters'], CoreGetters]>>;
  actions: GraphActions<MergeActions<[PluginData['actions'], CoreActions]>>;
  onAfterInit?: () => void;
};

type LooseGraphPluginOptions = {
  controls: any;
  events: EventHub<CoreEventMap>;
  actions: GraphActions<CoreActions>;
  getters: GraphGetters<CoreGetters>;
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
export type LooseGraphPlugin = (options: LooseGraphPluginOptions) => {
  controls: LoosePluginData['controls'];
  events: EventHub<CoreEventMap & LoosePluginData['events']>;
  actions: GraphActions<any>;
  getters: GraphGetters<any>;
  onAfterInit?: () => void;
};

export type RemoveArray<T> = T extends (infer F)[] ? F : T;

export type ExtractData<TPlugins extends LooseGraphPlugin[]> =
  UnionToIntersection<ReturnType<RemoveArray<NoInfer<TPlugins>>>>;

export type ExtractControls<TPlugins extends LooseGraphPlugin[]> =
  ExtractData<TPlugins> extends { controls: infer Controls } ? Controls : never;

export type ExtractActions<TPlugins extends LooseGraphPlugin[]> =
  TPlugins extends never[]
    ? // all plugins come pre-baked with core actions
      CoreActions
    : UnionToIntersection<
        ReturnType<RemoveArray<NoInfer<TPlugins>>> extends {
          actions: GraphActions<infer Actions>;
        }
          ? Actions
          : never
      >;

type GettersFromPlugin<Plugin extends LooseGraphPlugin> =
  Plugin extends LooseGraphPlugin
    ? {
        getNode: ReturnType<ReturnType<Plugin>['getters']['getNode']>;
        getEdge: ReturnType<ReturnType<Plugin>['getters']['getEdge']>;
      }
    : never;

export type ExtractGetters<TPlugins extends LooseGraphPlugin[]> =
  TPlugins extends never[]
    ? // all plugins come pre-baked with core getters
      CoreGetters
    : {
        [K in keyof BaseGetters]: UnionToIntersection<
          GettersFromPlugin<RemoveArray<NoInfer<TPlugins>>>[K]
        >;
      };

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
