import { ComponentSlot } from '../component-slot/types.ts';
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
  lensChips?: (graph: Graph) => LensChipDefinition[] | undefined;
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
  graph: Graph,
  componentSlots: ComponentSlotControls,
  options: UIOptions = {},
): UIControls => {
  const lensChips = options.lensChips?.(graph);

  const slots: (ComponentSlot | undefined)[] = [
    {
      id: 'product/bottom-right-controls',
      component: BottomRightControls,
      position: 'bottom-right',
    },
    {
      id: 'product/navigation-menu',
      component: NavigationMenu,
      position: 'top-left',
    },
    lensChips
      ? {
          id: 'product/lens-chips',
          component: LensChipGroup,
          position: 'top-middle',
        }
      : undefined,
    options.debug
      ? {
          id: 'product/debug/cursor-coordinates',
          component: CursorCoordinates,
          position: 'bottom-right',
        }
      : undefined,
  ];

  const definedSlots = slots.filter((s) => !!s);
  componentSlots.addMany(definedSlots);

  return {
    data: {
      annotations:
        options.annotations === false ? undefined : useAnnotationsState(graph),
      lensChips,
    },
  };
};
