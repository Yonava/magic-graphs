import { useGraphColors } from '@graph/themes/useGraphColors';

import { watch } from 'vue';
import type { MaybeRef } from 'vue';

import { useTextTip } from './useTextTip';

/**
 * a text tip themed after the global graph
 */
export const useGTextTip = (textInput?: MaybeRef<string>) => {
  const textTip = useTextTip(textInput);
  const colors = useGraphColors();

  watch(colors, () => {
    if (!colors.value) return;
    const { innerDiv } = textTip.els;
    innerDiv.style.backgroundColor = colors.value.primary;
    innerDiv.style.color = colors.value.text;
  });

  return textTip;
};
