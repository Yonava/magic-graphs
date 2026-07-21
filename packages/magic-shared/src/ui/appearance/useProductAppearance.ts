import { BasicColorSchema, useColorMode } from '@vueuse/core';

import { onMounted, watch } from 'vue';

import { Graph } from '../../graph/types.ts';
import { APPEARANCE_STORAGE_KEY, appearances } from './appearances.ts';

const validAppearance = (appearance: unknown): appearance is BasicColorSchema =>
  appearances.some((a) => a === appearance);

export type AppearanceControls = ReturnType<typeof useProductAppearance>;

export const useProductAppearance = (graph: Graph) => {
  const appearance = useColorMode({
    emitAuto: true,
    storageKey: APPEARANCE_STORAGE_KEY,
  });

  const setValue = () => {
    // appearance can be tampered with in local storage so we cant trust its type!
    const appearanceValue = appearance.state.value;
    if (!validAppearance(appearanceValue)) {
      console.warn(
        'Received unrecognized appearance value:',
        appearanceValue,
        '\n\nVacating stored appearance value.',
      );
      localStorage.removeItem(APPEARANCE_STORAGE_KEY);
      return;
    }
    graph.theme.activePresetName.value = appearanceValue;
  };

  watch(appearance.state, setValue);

  onMounted(setValue);

  return appearance;
};
