import { ComponentSlot } from '../component-slot/types.ts';
import { ComponentSlotControls } from '../component-slot/useComponentSlotsState.ts';
import { Graph } from '../graph/types.ts';
import LensChipGroup from '../ui/lens-chips/LensChipGroup.vue';
import { AnnotationsControls } from './annotations/useAnnotationsState.ts';
import BottomRightControls from './bottom-right-controls/BottomRightControls.vue';
import CursorCoordinates from './debug/CursorCoordinates.vue';
import { LensChipDefinition } from './lens-chips/types.ts';
import NavigationMenu from './navigation-menu/NavigationMenu.vue';

export type UIOptions<GraphLike> = {
  lensChips?: (graph: GraphLike) => LensChipDefinition[] | undefined;
  debug?: boolean;
  linkSharing?: boolean;
};

export type GraphUIOptions = UIOptions<Graph>;

export type UIControls = {
  lensChips?: LensChipDefinition[];
  annotations?: AnnotationsControls;
  linkSharing: boolean;
};

export const useProductUI = <GraphLike>(
  graph: GraphLike,
  componentSlots: ComponentSlotControls,
  options: UIOptions<GraphLike> = {},
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
    lensChips,
    linkSharing: options.linkSharing !== false,
  };
};
