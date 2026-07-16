import { CoreActions } from '@graph/core/actions/types';
import { CoreEventMap } from '@graph/core/events';
import { CoreGetters } from '@graph/core/getters';
import { CoreControls } from '@graph/core/types';
import { GraphActions, MergeActions } from '@graph/primitives/actions/types';
import { EventHub } from '@graph/primitives/events/createEventHub';
import { GraphGetters, MergeGetters } from '@graph/primitives/getters/types';
import { StructuralEventMap } from '@graph/primitives/transactions/types';

import { PluginSchemaInput, ResolvePluginSchema } from './defaults.ts';
import { ExtractControls, ExtractEventMap } from './extractors.ts';
import { LoosePluginSchema } from './loose.ts';
import { TransitField } from './transit.ts';

export type GraphPlugin<PluginSchema extends PluginSchemaInput> =
  ResolvedGraphPlugin<ResolvePluginSchema<PluginSchema>>;

type PluginInput<PluginSchema extends LoosePluginSchema> = {
  controls: CoreControls &
    ExtractControls<PluginSchema['dependsOn']> &
    (PluginSchema['optionalDependsOn'] extends never[]
      ? {}
      : Partial<ExtractControls<PluginSchema['optionalDependsOn']>>);
  events: EventHub<
    CoreEventMap &
      StructuralEventMap &
      ExtractEventMap<PluginSchema['dependsOn']> &
      (PluginSchema['optionalDependsOn'] extends never[]
        ? {}
        : ExtractEventMap<PluginSchema['optionalDependsOn']>)
  >;
  actions: GraphActions<CoreActions>;
  // [2]
  finalActions: GraphActions<CoreActions>;
  getters: GraphGetters<CoreGetters>;
};

type PluginOutput<PluginSchema extends LoosePluginSchema> = {
  name: PluginSchema['name'];
  controls: PluginSchema['controls'];
  // [1]
  events: EventHub<
    CoreEventMap &
      StructuralEventMap &
      ExtractEventMap<PluginSchema['dependsOn']> &
      (PluginSchema['optionalDependsOn'] extends never[]
        ? {}
        : ExtractEventMap<PluginSchema['optionalDependsOn']>) &
      PluginSchema['events']
  >;
  getters: GraphGetters<MergeGetters<[PluginSchema['getters'], CoreGetters]>>;
  actions: GraphActions<MergeActions<[PluginSchema['actions'], CoreActions]>>;
  onAfterInit?: () => void;
} & TransitField<PluginSchema['transit']>;

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

// [2] `actions` and `finalActions` exist because plugins use graph actions
// for two structurally different purposes, and one accessor can't serve both.
//
// - COMPOSING plugins (node-label, focus, history) wrap `actions` to extend the
//   pipeline: call the inbound action, do their own thing, return the result.
//   this needs a snapshot of "everything accumulated before my turn" so the
//   onion layers stay ordered and each plugin's post-action work finishes
//   before the *next* layer (and eventually create-graph's structural event
//   emission) sees the result. `actions` is exactly that snapshot.
//
// - TRIGGERING plugins (interactive) don't extend the pipeline at all — they
//   just want to invoke the real, fully-composed graph action later, from an
//   event handler set up during fold but fired long after (e.g. on a mouse
//   click). a snapshot is wrong for this: it's frozen at fold time, so it can
//   never see later plugins' contributions or create-graph's final
//   structural-event wrap, no matter where the plugin sits in the array.
//   `finalActions` is a stable accessor that always dispatches to whatever
//   the fully-wrapped, fully-composed actions object ends up being once
//   folding completes — safe to capture in a closure and call anytime after.
//
// composing plugins should keep using `actions`. only use `finalActions` when
// actually triggering a mutation in response to something external (user
// input, a timer, another event), not when building on the pipeline itself.
