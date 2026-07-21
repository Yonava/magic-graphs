import { ComponentSlotControls } from '../component-slot/useComponentSlotsState.ts';
import { Graph } from '../graph/types.ts';
import CursorCoordinates from '../product/debug/CursorCoordinates.vue';
import LensChipGroup from '../ui/lens-chips/LensChipGroup.vue';
import {
  AnnotationsControls,
  useAnnotationsState,
} from './annotations/useAnnotationsState.ts';
import BottomRightControls from './bottom-right-controls/BottomRightControls.vue';
import { LensChipDefinition } from './lens-chips/types.ts';
import NavigationMenu from './navigation-menu/NavigationMenu.vue';

export type UIOptions = {
  lensChips?: (graph: Graph) => LensChipDefinition[];
  annotations?: boolean;
  debug?: boolean;
};

export type UIControls = {
  data: {
    lensChips?: LensChipDefinition[];
    annotations?: AnnotationsControls;
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
      position: 'top-middle',
    });
  }

  componentSlots.add({
    id: 'product/bottom-right-controls',
    component: BottomRightControls,
    position: 'bottom-right',
  });

  if (options.debug) {
    componentSlots.add({
      id: 'product/debug/cursor-coordinates',
      component: CursorCoordinates,
      position: 'bottom-right',
    });
  }

  componentSlots.add({
    id: 'product/navigation-menu',
    component: NavigationMenu,
    position: 'top-left',
  });

  return {
    data: {
      annotations:
        options.annotations === false ? undefined : useAnnotationsState(graph),
      lensChips: options?.lensChips?.(graph),
    },
  };
};
