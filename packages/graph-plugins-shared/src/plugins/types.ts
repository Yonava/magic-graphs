import { CoreActions } from '@magic/graph-core/actions/types';
import { CoreEventMap } from '@magic/graph-core/events';
import { CoreGetters } from '@magic/graph-core/getters';
import { CoreControls } from '@magic/graph-core/types';
import {
  GraphActions,
  MergeActions,
} from '@magic/graph-primitives/actions/types';
import { EventHub } from '@magic/graph-primitives/events/createEventHub';
import {
  GraphGetters,
  MergeGetters,
} from '@magic/graph-primitives/getters/types';

import { ExtractControls, ExtractEventMap } from './extractors.ts';
import { LooseGraphPlugin, LoosePluginData } from './loose.ts';

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
