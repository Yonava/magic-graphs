import { computed } from 'vue';

import { ComponentSlot, SlotPosition } from './types.ts';
import { ComponentSlotControls } from './useComponentSlotsState.ts';

type SlotPositionToComponent = Record<
  SlotPosition,
  Omit<ComponentSlot, 'position'>[]
>;

const groupBySlotPosition = (
  componentSlots: readonly ComponentSlot[],
): SlotPositionToComponent => {
  const slots: SlotPositionToComponent = {
    'top-left': [],
    'top-middle': [],
    'top-right': [],
    'center-left': [],
    'center-right': [],
    'bottom-left': [],
    'bottom-middle': [],
    'bottom-right': [],
  };

  const prioritizedComponentSlots = componentSlots.toSorted((slotA, slotB) => {
    return (slotA.priority ?? 0) - (slotB.priority ?? 0);
  });
  for (const { position, ...component } of prioritizedComponentSlots) {
    slots[position].push(component);
  }

  return slots;
};

export const useComponentBySlotPosition = (
  controls: Pick<ComponentSlotControls, 'entries'>,
) => computed(() => groupBySlotPosition(controls.entries.value));
