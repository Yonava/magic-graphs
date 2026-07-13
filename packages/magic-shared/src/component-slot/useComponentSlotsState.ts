import { ComputedRef, computed, markRaw, ref } from 'vue';

import { ComponentSlot } from './types.ts';

export type ComponentSlotControls = {
  entries: ComputedRef<ComponentSlot[]>;
  add: (slots: ComponentSlot[]) => void;
  remove: (slotId: string) => void;
};

export const useComponentSlotsState = (): ComponentSlotControls => {
  const componentSlots = ref<ComponentSlot[]>([]);

  return {
    entries: computed(() => componentSlots.value),
    add: (slots) => {
      const markedSlots = slots.map((slot) => ({
        ...slot,
        component: markRaw(slot.component),
      }));
      componentSlots.value.push(...markedSlots);
    },
    remove: (slotId) => {
      componentSlots.value = componentSlots.value.filter(
        (slot) => slot.id !== slotId,
      );
    },
  };
};
