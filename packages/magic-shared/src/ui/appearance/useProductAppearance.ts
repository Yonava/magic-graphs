import { BasicColorMode, BasicColorSchema, useColorMode } from '@vueuse/core';

import { onMounted, watch } from 'vue';

import { APPEARANCE_STORAGE_KEY, appearances } from './appearances.ts';

const validAppearance = (appearance: unknown): appearance is BasicColorSchema =>
  appearances.some((a) => a === appearance);

export type AppearanceControls = ReturnType<typeof useProductAppearance>;

export const useProductAppearance = (
  setAppearance: (color: BasicColorMode) => void,
) => {
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
    setAppearance(appearanceValue);
  };

  watch(appearance.state, setValue);

  onMounted(setValue);

  return appearance;
};
