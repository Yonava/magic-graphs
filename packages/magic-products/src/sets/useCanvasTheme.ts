import { cross } from '@canvas/primitives/shapes/cross/index';
import { dark } from '@graph/theme-presets/dark/index';
import { light } from '@graph/theme-presets/light/index';
import { Magic } from '@magic/shared/product/useMagicProduct';

import { computed, onMounted, watch } from 'vue';

export const useCanvasTheme = (magic: Magic) => {
  const theme = computed(() =>
    magic.appearance.state.value === 'dark' ? dark : light,
  );
  const canvas = computed(() => magic.canvas.surface.canvas.value);

  const setCanvasColor = () => {
    if (!canvas.value) return console.warn('no canvas found in DOM');
    canvas.value.style.backgroundColor = theme.value.canvas['canvas.color'];
  };

  watch(theme, setCanvasColor);

  onMounted(setCanvasColor);

  magic.canvas.surface.draw.backgroundPattern.value = (ctx, alpha) => {
    const origin = { x: 0, y: 0 };

    const cell = cross({
      at: origin,
      size: 12,
      lineWidth: 1,
      fillColor: theme.value.canvas['canvas.patternColor'](alpha),
    });

    return (at) => {
      ctx.save();
      ctx.translate(at.x, at.y);
      cell.draw(ctx);
      ctx.restore();
    };
  };
};
