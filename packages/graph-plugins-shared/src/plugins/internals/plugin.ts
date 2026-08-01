import { CoreActions } from '@graph/core/actions/types';
import { ConsumerEventsHub } from '@graph/core/consumer-events';
import { CoreGetters } from '@graph/core/getters';
import { CoreControls } from '@graph/core/types';
import { GraphActions } from '@graph/primitives/actions/types';
import { GraphGetters } from '@graph/primitives/getters/types';
import { LooseGraphTransit } from '@graph/primitives/transit/types';

import { PluginSchemaInput, ResolvePluginSchema } from './defaults.ts';
import { ExtractControls } from './extractors.ts';
import { LoosePluginSchema } from './loose.ts';
import { ActionsField, GettersField, TransitField } from './output-fields.ts';

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
  // [3]
  getters: GraphGetters<CoreGetters>;
  // [2]
  finalTransit: LooseGraphTransit;
};

type PluginOutput<PluginSchema extends LoosePluginSchema> = {
  name: PluginSchema['name'];
  controls: PluginSchema['controls'];
  onAfterInit?: () => void;
} & GettersField<PluginSchema['getters']> &
  ActionsField<PluginSchema['actions']> &
  TransitField<PluginSchema['transit']>;

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

// [2] `transit` is declared per plugin (see PluginOutput above), but the graph wide
// encode/decode surface is only assembled out of every plugin's contribution once
// folding finishes. `finalTransit` is the late bound accessor to that assembled
// surface, in the same spirit as `finalActions` in [1]: safe to capture during fold,
// invalid to call before graph creation completes.
//
// this is what lets a plugin snapshot and restore the *whole* graph without knowing
// which other plugins exist. history relies on it — each plugin already knows how to
// encode and decode the state it owns, so history never has to learn about
// plugin-owned node/edge properties (nodeLabel's labels, and anything a third party
// adds) in order to preserve them across an undo.
//
// [3] a plugin whose getters read state it owns must hold that state in a
// `@reactive/primitives` container (signal, reactiveMap, reactiveSet). nothing else
// is required: `nodes`/`edges` are computeds over the getters, so a tracked read
// during derivation is what keeps them fresh. plain mutable state is the one thing
// that breaks it, silently.
