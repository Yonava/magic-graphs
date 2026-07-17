import { ComponentSlotControls } from '../component-slot/useComponentSlotsState.ts';
import { Graph } from '../graph/types.ts';
import CursorCoordinates from '../product/debug/CursorCoordinates.vue';
import LensChipGroup from '../ui/lens-chips/LensChipGroup.vue';
import AnnotationMenu from './annotations/AnnotationMenu.vue';
import {
  AnnotationsControls,
  useAnnotationsState,
} from './annotations/useAnnotationsState.ts';
import { LensChipDefinition } from './lens-chips/types.ts';

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
      position: 'bottom-middle',
    });
  }

  if (options.annotations) {
    componentSlots.add({
      id: 'product/annotations',
      component: AnnotationMenu,
      position: 'bottom-right',
    });
  }

  if (options.debug) {
    componentSlots.add({
      id: 'product/debug/cursor-coordinates',
      component: CursorCoordinates,
      position: 'bottom-right',
    });
  }

  return {
    data: {
      annotations: options.annotations ? useAnnotationsState(graph) : undefined,
      lensChips: options?.lensChips?.(graph),
    },
  };
};
