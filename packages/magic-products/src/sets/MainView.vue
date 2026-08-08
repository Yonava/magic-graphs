<script setup lang="ts">
  import { useCanvas } from '@canvas/surface/index';
  import { createEventHub } from '@graph/primitives/events/createEventHub';
  import { MagicProduct, useMagicProduct } from '@magic/shared/product';
  import { MinimalFields } from '@magic/shared/product/useMagicProduct';

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

  useMagicProduct(graphLike, {
    productId: 'sets',
    ui: {
      annotations: false,
    },
  });
</script>

<template>
  <MagicProduct />
</template>
