import { computed } from 'vue';

import { ComponentSlot, SlotPosition } from './types.ts';
import { ComponentSlotControls } from './useComponentSlotsState.ts';

type SlotPositionToComponent = Record<
  SlotPosition,
  ComponentSlot['component'][]
>;

const groupBySlotPosition = (
  componentSlots: readonly ComponentSlot[],
): SlotPositionToComponent => {
  const slots: SlotPositionToComponent = {
    left: [],
    right: [],
  };

  for (const { position, component } of componentSlots) {
    slots[position].push(component);
  }

  return slots;
};

export const useComponentBySlotPosition = (
  controls: Pick<ComponentSlotControls, 'entries'>,
) => computed(() => groupBySlotPosition(controls.entries.value));
