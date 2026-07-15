import { ComponentSlotControls } from '../component-slot/useComponentSlotsState.ts';
import { Graph } from '../graph/types.ts';
import LensChipGroup from '../ui/lens-chips/LensChipGroup.vue';
import { LensChipDefinition } from './lens-chips/types.ts';

export type UIOptions = {
  lensChips?: (graph: Graph) => LensChipDefinition[];
};

export type UIControls = {
  data: {
    lensChips: LensChipDefinition[];
  };
};

export const useProductUI = (
  options: UIOptions,
  graph: Graph,
  componentSlots: ComponentSlotControls,
): UIControls => {
  if (options?.lensChips) {
    componentSlots.add({
      id: 'product/lens-chips',
      component: LensChipGroup,
      position: 'bottom-middle',
    });
  }

  return {
    data: {
      lensChips: options?.lensChips?.(graph) ?? [],
    },
  };
};
