import { ComputedRef, computed } from 'vue';

import { Controls } from './index.ts';

export type CompleteControls = {
  isComplete: ComputedRef<boolean>;
};

export const useComplete = (controls: Controls): CompleteControls => {
  const isComplete = computed(() => {
    const isDirected = controls.settings.isGraphDirected;
    const n = controls.nodes.value.length;
    const m = controls.edges.value.length;
    return m === (isDirected ? n * (n - 1) : (n * (n - 1)) / 2);
  });

  return {
    isComplete,
  };
};
