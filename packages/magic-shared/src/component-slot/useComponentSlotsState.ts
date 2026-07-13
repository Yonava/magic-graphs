import { ComputedRef, computed, markRaw, ref } from 'vue';

import { ComponentSlot } from './types.ts';

export type ComponentSlotControls = {
  entries: ComputedRef<ComponentSlot[]>;
  set: (v: ComponentSlot[]) => void;
};

export const useComponentSlotsState = (): ComponentSlotControls => {
  const componentSlots = ref<ComponentSlot[]>([]);

  return {
    entries: computed(() => componentSlots.value),
    set: (v) =>
      (componentSlots.value = v.map((slot) => ({
        ...slot,
        component: markRaw(slot.component),
      }))),
  };
};
