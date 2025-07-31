import tinycolor from 'tinycolor2';

import { computed } from 'vue';
import type { Ref } from 'vue';

/**
 * creates a tinycolor instance from a color string
 *
 * @param color - a color string
 * @returns a computed tinycolor instance
 * @throws if the color string is invalid
 * @example const color = ref('#ff0000') // red tiny color instance
 */
export const useTinycolor = (color: Ref<string>) =>
  computed(() => {
    const tinycolorInstance = tinycolor(color.value);
    if (!tinycolorInstance.isValid()) {
      throw new Error('invalid color');
    }

    return tinycolorInstance;
  });
