import { CanvasProps, CanvasRef } from '@canvas/surface/types';
import { ReadonlyEventHub } from '@graph/primitives/events/createEventHub';
import { BasicColorMode } from '@vueuse/core';

import { onMounted } from 'vue';

import { useComponentSlotsState } from '../component-slot/useComponentSlotsState.ts';
import { ComponentSlotControls } from '../component-slot/useComponentSlotsState.ts';
import { useLensState } from '../lens/useLensState.ts';
import { LensControls } from '../lens/useLensState.ts';
import { useProductShortcuts } from '../shortcuts/useProductShortcuts.ts';
import { ShortcutControls, useShortcuts } from '../shortcuts/useShortcuts.ts';
import { useSimulationState } from '../simulation/useSimulationState.ts';
import { SimulationControls } from '../simulation/useSimulationState.ts';
import {
  AppearanceControls,
  useProductAppearance,
} from '../ui/appearance/useProductAppearance.ts';
import { loadFromLinkPayload } from '../ui/link-sharing/linkPayload.ts';
import { UIControls, UIOptions, useProductUI } from '../ui/useProductUI.ts';
import { ProductId, manifests } from './index.ts';
import { MagicProductManifest } from './manifests/types.ts';
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

export type MinimalFields = {
  /** load a payload into state */
  decode: (payload: any) => void;
  transit: TransitField;
  events: ReadonlyEventHub<{
    onStructureChange: () => void;
  }>;
  setAppearance: (color: BasicColorMode) => void;
  canvas: CanvasField;
};

type ProductOptions<GraphLike> = {
  productId: ProductId;
  ui?: UIOptions<GraphLike>;
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
};

export const useMagicProduct = (
  fields: MinimalFields,
  options: ProductOptions<MinimalFields>,
) => {
  const componentSlots = useComponentSlotsState();
  const lens = useLensState(componentSlots);
  const simulation = useSimulationState(
    fields.events.subscribe,
    componentSlots,
    lens,
  );

  const ui = useProductUI(fields, componentSlots, options.ui);
  const appearance = useProductAppearance(fields.setAppearance);
  const shortcuts = useShortcuts();

  const magic: Magic = {
    manifest: manifests[options.productId],
    lens,
    componentSlots,
    simulation,
    ui,
    appearance,
    shortcuts,
    canvas: fields.canvas,
    transit: fields.transit,
  };

  if (magic.ui.linkSharing) {
    onMounted(() => loadFromLinkPayload(magic));
  }

  useProductShortcuts(magic);
  provideMagic(magic);

  return magic;
};
