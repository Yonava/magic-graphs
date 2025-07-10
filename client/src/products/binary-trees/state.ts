import { shallowRef } from 'vue';
import type { TreeTrace } from './tree/avl';
import type { SimulationControls } from '@ui/product/sim/types';

export type TreeSim = SimulationControls<TreeTrace>

const activeSim = shallowRef<TreeSim>();

const reset = () => {
  if (activeSim.value) {
    activeSim.value.stop();
    activeSim.value = undefined;
  }
};

export default {
  activeSim,
  reset,
};
