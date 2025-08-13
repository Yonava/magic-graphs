import type { SimulationRunner } from '@magic/ui/product/sim/types';

import { shallowRef } from 'vue';

import type { TreeTraceStep } from './tree/avl';

export type TreeSimRunner = SimulationRunner<TreeTraceStep>;
const simRunner = shallowRef<TreeSimRunner>();

export default {
  simRunner,
  reset: () => simRunner.value?.stop(),
};
