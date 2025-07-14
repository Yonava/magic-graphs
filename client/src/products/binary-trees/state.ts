import { shallowRef } from 'vue';
import type { TreeTraceStep } from './tree/avl';
import type { SimulationControls } from '@ui/product/sim/types';

export type TreeSim = SimulationControls<TreeTraceStep> & {
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
