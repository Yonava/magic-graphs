import { CanvasProps } from '@canvas/surface/types';
import { ReadonlyEventHub } from '@graph/primitives/events/createEventHub';
import { BasicColorMode } from '@vueuse/core';

import { ComputedRef, onMounted } from 'vue';

import { useComponentSlotsState } from '../component-slot/useComponentSlotsState.ts';
import { ComponentSlotControls } from '../component-slot/useComponentSlotsState.ts';
import { Graph } from '../graph/types.ts';
import { useLensState } from '../lens/useLensState.ts';
import { LensControls } from '../lens/useLensState.ts';
import { useProductShortcuts } from '../shortcuts/useProductShortcuts.ts';
import { ShortcutControls, useShortcuts } from '../shortcuts/useShortcuts.ts';
import { useSimulationState } from '../simulation/useSimulationState.ts';
import { SimulationControls } from '../simulation/useSimulationState.ts';
import {
  AnnotationsControls,
  useAnnotationsState,
} from '../ui/annotations/useAnnotationsState.ts';
import {
  AppearanceControls,
  useProductAppearance,
} from '../ui/appearance/useProductAppearance.ts';
import { LensChipDefinition } from '../ui/lens-chips/types.ts';
import { loadFromLinkPayload } from '../ui/link-sharing/linkPayload.ts';
import { UIControls, UIOptions, useProductUI } from '../ui/useProductUI.ts';
import { ProductId, manifests } from './index.ts';
import { MagicProductManifest } from './manifests/types.ts';
import { useLocalStorageSync } from './useLocalStorageSync.ts';
import { provideMagic } from './useProvidedGraph.ts';

type CanvasField = {
  events: ReadonlyEventHub<{
    onMouseDown: () => void;
    onMouseUp: () => void;
  }>;
  surface: CanvasProps;
};

type TransitField = {
  encode: () => any;
  decode: (payload: any) => void;
};

type HistoryField = {
  canRedo: ComputedRef<boolean>;
  canUndo: ComputedRef<boolean>;
  undo: () => void;
  redo: () => void;
};

export type MagicProductHost = {
  transit: TransitField;
  events: ReadonlyEventHub<{
    onStructureChange: () => void;
  }>;
  canvas: CanvasField;
  setAppearance: (color: BasicColorMode) => void;
  history?: HistoryField;
};

type ProductOptions = {
  productId: ProductId;
  // TODO narrow this down to an host interface so annotations can be adapted to non-graph products
  annotations?: Graph;
  lensChips?: LensChipDefinition[];
  ui?: UIOptions;
  /** provide a handler for the trigger save function if you want to opt-in to local storage  */
  localStorage?: (triggerSave: () => void) => void;
};

export type Magic = {
  manifest: MagicProductManifest;
  lens: LensControls;
  componentSlots: ComponentSlotControls;
  simulation: SimulationControls;
  ui: UIControls;
  appearance: AppearanceControls;
  shortcuts: ShortcutControls;
  canvas: CanvasField;
  transit: TransitField;
  history?: HistoryField;
  annotations?: AnnotationsControls;
  lensChips?: LensChipDefinition[];
};

export const useMagicProduct = (
  host: MagicProductHost,
  options: ProductOptions,
) => {
  const componentSlots = useComponentSlotsState();
  const lens = useLensState(componentSlots);
  const simulation = useSimulationState(
    host.events.subscribe,
    componentSlots,
    lens,
  );

  const annotations = options.annotations
    ? useAnnotationsState(options.annotations)
    : undefined;

  const ui = useProductUI(componentSlots, options.ui);
  const appearance = useProductAppearance(host.setAppearance);
  const shortcuts = useShortcuts();

  const magic: Magic = {
    manifest: manifests[options.productId],
    lens,
    componentSlots,
    simulation,
    ui,
    appearance,
    shortcuts,
    annotations,
    lensChips: options.lensChips,
    canvas: host.canvas,
    transit: host.transit,
    history: host.history,
  };

  // ORDER MATTERS!
  // local storage before link share, otherwise local storage content loads on top of a shared link
  if (options.localStorage) {
    const triggerSave = useLocalStorageSync(magic);
    options.localStorage(triggerSave);
  }

  if (magic.ui.linkSharing) {
    onMounted(() => loadFromLinkPayload(magic));
  }

  useProductShortcuts(magic);
  provideMagic(magic);

  return magic;
};
