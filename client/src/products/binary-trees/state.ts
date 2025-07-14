import { shallowRef } from 'vue';
import type { TreeTraceStep } from './tree/avl';
import type { SimulationRunner } from '@ui/product/sim/types';

export type TreeSimRunner = SimulationRunner<TreeTraceStep>
const simRunner = shallowRef<TreeSimRunner>();

export default {
  simRunner,
  reset: () => simRunner.value?.stop(),
};
