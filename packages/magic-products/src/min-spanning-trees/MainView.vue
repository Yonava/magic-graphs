<script setup lang="ts">
  import colors from '@core/utils/colors';
  import { generateId } from '@core/utils/id';
  import { AggregatorTransformer } from '@graph/plugins/canvas/aggregator/types';
  import { GraphUnderCursor } from '@graph/plugins/canvas/types';
  import { createPhantomAwareEdgeRenderFunction } from '@graph/plugins/phantom/createPhantomAwareEdgeRenderFunction';
  import { CoreEdge } from '@graph/primitives/types';
  import { GraphProduct, useGraphProduct } from '@magic/shared/product';
  import { LensChipDefinition } from '@magic/shared/ui/lens-chips/types';
  import tinycolor from 'tinycolor2';
  import type { DeepReadonly } from 'ts-essentials';

  import { computed } from 'vue';

  import { lensChips } from './lensChips.ts';
  import { manifest } from './manifest.ts';

  useGraphProduct({
    manifest,
    core: {
      directed: false,
    },
    interactive: {
      allowSelfLoops: false,
    },
    ui: {
      lensChips,
    },
  });

  // graph.magic.componentSlots.add({
  //   component: ActiveMST,
  //   id: 'mst-viewer',
  //   position: 'bottom-middle',
  // });
</script>

<template>
  <GraphProduct />
</template>
