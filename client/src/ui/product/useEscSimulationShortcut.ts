import { PRODUCT_SHORTCUTS } from '@product/shared/shortcuts';
import keys from 'ctrl-keys';

import { onUnmounted } from 'vue';

export const useEscSimulationShortcut = (stopSimulation: () => void) => {
  const ctrlKeys = keys();
  ctrlKeys.add(PRODUCT_SHORTCUTS['Exit Simulation'].binding, stopSimulation);

  window.addEventListener('keyup', ctrlKeys.handle);
  onUnmounted(() => window.removeEventListener('keyup', ctrlKeys.handle));
};
