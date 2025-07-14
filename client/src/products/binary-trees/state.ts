import { shallowRef } from 'vue';
import type { TreeTrace } from './tree/avl';
import type { SimulationControls } from '@ui/product/sim/types';

export type TreeSim = SimulationControls<TreeTrace> & {
  /**
   * tears down the running simulation and resets `activeSim` state
   */
  kill: () => void;
}

const activeSim = shallowRef<TreeSim>();

export default {
  activeSim,
  reset: () => activeSim.value?.kill(),
};
