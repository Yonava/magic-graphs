import { shallowRef } from 'vue';
import type { TreeTraceStep } from './tree/avl';
import type { SimulationRunner } from '@ui/product/sim/types';

export type TreeSimRunner = SimulationRunner<TreeTraceStep>

const activeSim = shallowRef<TreeSimRunner>();

export default {
  activeSim,
  reset: () => activeSim.value?.stop(),
};
