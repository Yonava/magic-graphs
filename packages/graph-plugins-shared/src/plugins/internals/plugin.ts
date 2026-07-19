import { CoreActions } from '@graph/core/actions/types';
import { ConsumerEventsHub } from '@graph/core/consumer-events';
import { CoreGetters } from '@graph/core/getters';
import { CoreControls } from '@graph/core/types';
import { GraphActions, MergeActions } from '@graph/primitives/actions/types';
import { GraphGetters, MergeGetters } from '@graph/primitives/getters/types';

import { PluginSchemaInput, ResolvePluginSchema } from './defaults.ts';
import { ExtractControls } from './extractors.ts';
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
  actions: GraphActions<CoreActions>;
  events: ConsumerEventsHub;
  // [1]
  finalActions: GraphActions<CoreActions>;
  getters: GraphGetters<CoreGetters>;
};

type PluginOutput<PluginSchema extends LoosePluginSchema> = {
  name: PluginSchema['name'];
  controls: PluginSchema['controls'];
  getters: GraphGetters<MergeGetters<[PluginSchema['getters'], CoreGetters]>>;
  actions: GraphActions<MergeActions<[PluginSchema['actions'], CoreActions]>>;
  onAfterInit?: () => void;
} & TransitField<PluginSchema['transit']>;

type ResolvedGraphPlugin<PluginSchema extends LoosePluginSchema> = (
  options: PluginInput<PluginSchema>,
) => PluginOutput<PluginSchema>;

// [1] `actions` and `finalActions` exist because plugins use graph actions
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
