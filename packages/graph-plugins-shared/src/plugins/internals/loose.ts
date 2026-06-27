import { CoreActions } from '@magic/graph-core/actions/types';
import { CoreEventMap } from '@magic/graph-core/events';
import { CoreGetters } from '@magic/graph-core/getters';
import {
  GraphActions,
  PartialBaseActions,
} from '@magic/graph-primitives/actions/types';
import { EventHub } from '@magic/graph-primitives/events/createEventHub';
import { GenericEventMap } from '@magic/graph-primitives/events/types';
import {
  BaseGetters,
  GraphGetters,
} from '@magic/graph-primitives/getters/types';

type LooseGraphPluginOptions = {
  controls: any;
  events: EventHub<CoreEventMap>;
  actions: GraphActions<CoreActions>;
  getters: GraphGetters<CoreGetters>;
};

export type LoosePluginSchema = {
  controls: object;
  events: GenericEventMap;
  getters: Partial<BaseGetters>;
  actions: PartialBaseActions;
  dependsOn: LooseGraphPlugin[];
  optionalDependsOn: LooseGraphPlugin[];
};

export type LooseGraphPlugin = (options: LooseGraphPluginOptions) => {
  controls: LoosePluginSchema['controls'];
  // [1]
  events: EventHub<CoreEventMap & LoosePluginSchema['events']>;
  actions: GraphActions<any>;
  getters: GraphGetters<any>;
  onAfterInit?: () => void;
};

// [1] `CoreEventMap` is intersected into the return type (not just the events
// param) to keep the "merge yourself" contract honest at the type level: every
// plugin must hand back a hub that still carries everything core (and upstream
// plugins) emit, not just its own events. dropping this intersection would let
// a plugin's loosely-typed return shape claim to satisfy `LooseGraphPlugin`
// while actually losing `CoreEventMap` from the threaded hub, which is exactly
// the failure mode `ExtractEventMap` relies on this type to rule out.
