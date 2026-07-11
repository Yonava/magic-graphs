import { ComputedRef, computed, ref, watch } from 'vue';

import { ComponentSlotControls } from '../component-slot/useComponentSlotsState.ts';
import type { Lens } from './types.ts';

export type LensControls = {
  add: (lens: Lens) => void;
  remove: (id: string) => void;
  activeId: ComputedRef<string | undefined>;
};

export const useLensState = (
  componentSlots: Pick<ComponentSlotControls, 'set'>,
): LensControls => {
  const lenses = ref<Lens[]>([]);

  const removeLens = (id: Lens['id']) => {
    lenses.value = lenses.value.filter((l) => l.id !== id);
  };

  const addLens = (lens: Lens) => {
    removeLens(lens.id);
    lenses.value.push(lens);
  };

  const activeLens = computed(() => lenses.value.at(-1));

  watch(activeLens, (newLens, oldLens) => {
    if (oldLens) {
      oldLens.teardown();
      componentSlots.set([]);
    }
    if (newLens) {
      newLens.setup();
      componentSlots.set(newLens.components ?? []);
    }
  });

  return {
    add: addLens,
    remove: removeLens,
    activeId: computed(() => activeLens.value?.id),
  };
};
