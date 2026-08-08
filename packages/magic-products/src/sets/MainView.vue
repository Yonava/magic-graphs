<script setup lang="ts">
  import { cross } from '@canvas/primitives/shapes/cross/index';
  import { useCanvas } from '@canvas/surface/index';
  import { createEventHub } from '@graph/primitives/events/createEventHub';
  import { dark } from '@graph/theme-presets/dark/index';
  import { light } from '@graph/theme-presets/light/index';
  import { MagicProduct, useMagicProduct } from '@magic/shared/product';
  import { MinimalFields } from '@magic/shared/product/useMagicProduct';

  import { computed } from 'vue';

  const surface = useCanvas();

  const graphLike: MinimalFields = {
    decode: () => {},
    setAppearance: () => {},
    events: createEventHub<{ onStructureChange: () => void }>({
      onStructureChange: new Set(),
    }),
    canvas: {
      surface,
      events: createEventHub<{
        onMouseUp: () => void;
        onMouseDown: () => void;
      }>({
        onMouseUp: new Set(),
        onMouseDown: new Set(),
      }),
    },
    transit: {
      encode: () => {},
      decode: () => {},
    },
  };

  const magic = useMagicProduct(graphLike, {
    productId: 'sets',
    ui: {
      annotations: false,
    },
  });

  const theme = computed(() =>
    magic.appearance.state.value === 'dark' ? dark : light,
  );

  surface.draw.backgroundPattern.value = (ctx, alpha) => {
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
</script>

<template>
  <MagicProduct />
</template>
