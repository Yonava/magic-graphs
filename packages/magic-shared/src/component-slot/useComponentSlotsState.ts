import { ComputedRef, computed, markRaw, shallowRef } from 'vue';

import { ComponentSlot } from './types.ts';

export type ComponentSlotControls = {
  entries: ComputedRef<ComponentSlot[]>;
  add: (slot: ComponentSlot) => void;
  addMany: (slots: ComponentSlot[]) => void;
  remove: (slotId: string) => void;
};

export const useComponentSlotsState = (): ComponentSlotControls => {
  const componentSlots = shallowRef<ComponentSlot[]>([]);

  const addMany = (slots: ComponentSlot[]) => {
    const newSlots = slots.map((slot) => ({
      ...slot,
      component: markRaw(slot.component),
    }));
    componentSlots.value = [...componentSlots.value, ...newSlots];
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
