import { ComputedRef, computed, markRaw, ref } from 'vue';

import { ComponentSlot } from './types.ts';

export type ComponentSlotControls = {
  entries: ComputedRef<ComponentSlot[]>;
  add: (slot: ComponentSlot) => void;
  addMany: (slots: ComponentSlot[]) => void;
  remove: (slotId: string) => void;
};

export const useComponentSlotsState = (): ComponentSlotControls => {
  const componentSlots = ref<ComponentSlot[]>([]);

  const addMany = (slots: ComponentSlot[]) => {
    const markedSlots = slots.map((slot) => ({
      ...slot,
      component: markRaw(slot.component),
    }));
    componentSlots.value.push(...markedSlots);
  };

  return {
    entries: computed(() => componentSlots.value),
    add: (slot) => addMany([slot]),
    addMany,
    remove: (slotId) => {
      componentSlots.value = componentSlots.value.filter(
        (slot) => slot.id !== slotId,
      );
    },
  };
};
