<script setup lang="ts">
  import { useCanvas } from '@canvas/surface/index';
  import { createEventHub } from '@graph/primitives/events/createEventHub';
  import {
    MagicProduct,
    MagicProductHost,
    useMagicProduct,
  } from '@magic/shared/product';

  import { useCanvasTheme } from './useCanvasTheme.ts';

  const surface = useCanvas();

  const graphLike: MagicProductHost = {
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
    ui: { linkSharing: false },
  });

  useCanvasTheme(magic);
</script>

<template>
  <MagicProduct />
</template>
