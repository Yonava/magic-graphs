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

import { ResolvePluginData } from './defaults.ts';
import { ExtractControls, ExtractEventMap } from './extractors.ts';
import { LoosePluginSchema } from './loose.ts';

export type GraphPlugin<PluginSchema extends Partial<LoosePluginSchema>> =
  ResolvedGraphPlugin<ResolvePluginData<PluginSchema>>;

type PluginInput<PluginSchema extends LoosePluginSchema> = {
  controls: CoreControls &
    ExtractControls<PluginSchema['dependsOn']> &
    (PluginSchema['optionalDependsOn'] extends never[]
      ? {}
      : Partial<ExtractControls<PluginSchema['optionalDependsOn']>>);
  events: EventHub<
    CoreEventMap &
      ExtractEventMap<PluginSchema['dependsOn']> &
      (PluginSchema['optionalDependsOn'] extends never[]
        ? {}
        : ExtractEventMap<PluginSchema['optionalDependsOn']>)
  >;
  actions: GraphActions<CoreActions>;
  getters: GraphGetters<CoreGetters>;
};

type PluginOutput<PluginSchema extends LoosePluginSchema> = {
  controls: PluginSchema['controls'];
  // [1]
  events: EventHub<
    CoreEventMap &
      ExtractEventMap<PluginSchema['dependsOn']> &
      (PluginSchema['optionalDependsOn'] extends never[]
        ? {}
        : ExtractEventMap<PluginSchema['optionalDependsOn']>) &
      PluginSchema['events']
  >;
  getters: GraphGetters<MergeGetters<[PluginSchema['getters'], CoreGetters]>>;
  actions: GraphActions<MergeActions<[PluginSchema['actions'], CoreActions]>>;
  onAfterInit?: () => void;
};

type ResolvedGraphPlugin<PluginSchema extends LoosePluginSchema> = (
  options: PluginInput<PluginSchema>,
) => PluginOutput<PluginSchema>;

// [1] a plugin receives the upstream event hub (core's events plus everything
// dependent plugins have already merged in) and is responsible for merging
// its own events into it and returning the *same* hub, extended.
//
// there's no separate slot to stash a plugin's event map alongside the
// upstream one (unlike `controls`, which is just flat intersection) because
// the hub is a single threaded object: each plugin subscribes to it,
// extends it, and hands the merged hub to the next plugin in the chain.
// a plugin that returned a fresh, unmerged hub of just its own events
// would silently drop every event upstream plugins (and core) emit, since
// downstream plugins and consumers only ever see what's returned here.
