import { CoreActions } from '@graph/core/actions/types';
import { CoreEventMap } from '@graph/core/events';
import { CoreGetters } from '@graph/core/getters';
import {
  GraphActions,
  PartialBaseActions,
} from '@graph/primitives/actions/types';
import { EventHub } from '@graph/primitives/events/createEventHub';
import { GenericEventMap } from '@graph/primitives/events/types';
import { BaseGetters, GraphGetters } from '@graph/primitives/getters/types';

export type LoosePluginSchema = {
  name: string;
  controls: object;
  events: GenericEventMap;
  getters: Partial<BaseGetters>;
  actions: PartialBaseActions;
  transit: any;
  dependsOn: LooseGraphPlugin[];
  optionalDependsOn: LooseGraphPlugin[];
};

type LoosePluginInput = {
  controls: any;
  events: EventHub<CoreEventMap>;
  actions: GraphActions<CoreActions>;
  getters: GraphGetters<CoreGetters>;
};

type LoosePluginOutput = {
  name: LooseGraphPlugin['name'];
  controls: LoosePluginSchema['controls'];
  // [1]
  events: EventHub<CoreEventMap & LoosePluginSchema['events']>;
  actions: GraphActions<any>;
  getters: GraphGetters<any>;
  onAfterInit?: () => void;
  transit?: {
    encode: () => any;
    decode: (data: any) => void;
    validate: (data: any) => boolean;
  };
};

export type LooseGraphPlugin = (options: LoosePluginInput) => LoosePluginOutput;

// [1] `CoreEventMap` is intersected into the return type (not just the events
// param) to keep the "merge yourself" contract honest at the type level: every
// plugin must hand back a hub that still carries everything core (and upstream
// plugins) emit, not just its own events. dropping this intersection would let
// a plugin's loosely-typed return shape claim to satisfy `LooseGraphPlugin`
// while actually losing `CoreEventMap` from the threaded hub, which is exactly
// the failure mode `ExtractEventMap` relies on this type to rule out.
