import { CoreActions } from '@graph/core/actions/types';
import { ConsumerEventsHub } from '@graph/core/consumer-events';
import { CoreGetters } from '@graph/core/getters';
import {
  GraphActions,
  PartialBaseActions,
} from '@graph/primitives/actions/types';
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
  events: ConsumerEventsHub;
  actions: GraphActions<CoreActions>;
  // see [1] in ./plugin.ts — a stable accessor for the fully-composed graph
  // actions, safe to capture in a closure and invoke after folding completes
  finalActions: GraphActions<CoreActions>;
  getters: GraphGetters<CoreGetters>;
  // see [2] in ./plugin.ts — call after mutating any plugin-local state a getter
  // reads from, so create-graph knows to recompute getNodes()/getEdges()
  invalidateGetters: () => void;
};

type LoosePluginOutput = {
  name: LooseGraphPlugin['name'];
  controls: LoosePluginSchema['controls'];
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
