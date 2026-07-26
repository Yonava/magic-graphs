import { ComputedRef, computed, markRaw, ref, shallowRef } from 'vue';

import { ComponentSlot } from './types.ts';

export type ComponentSlotControls = {
  entries: ComputedRef<ComponentSlot[]>;
  add: (slot: ComponentSlot) => void;
  addMany: (slots: ComponentSlot[]) => void;
  remove: (slotId: string) => void;
  setHighlighted: (slotId: string) => void;
  clearHighlighted: () => void;
  highlightedId: ComputedRef<string | undefined>;
};

export const useComponentSlotsState = (): ComponentSlotControls => {
  const componentSlots = shallowRef<ComponentSlot[]>([]);
  const highlightedSlot = ref<ComponentSlot['id']>();

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
    setHighlighted: (slotId) => {
      highlightedSlot.value = slotId;
    },
    clearHighlighted: () => (highlightedSlot.value = undefined),
    highlightedId: computed(() => highlightedSlot.value),
  };
};
