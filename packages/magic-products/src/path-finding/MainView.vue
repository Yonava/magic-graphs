<script setup lang="ts">
  import { GraphProduct, useGraphProduct } from '@magic/shared/product';
  import { Fraction } from 'fraction.js';

  import BottomPanel from './BottomPanel.vue';

  useGraphProduct({
    core: {},
    interactive: {
      edgeInputToWeight: (input) => {
        if (input === 'e') {
          return new Fraction(10);
        }
      },
      addedEdgeRuleNoSelfLoops: true,
      addedEdgeWeight: () => new Fraction(5),
      addedEdgeRuleOneEdgePerPath: false,
    },
  });
</script>

<template>
  <GraphProduct>
    <BottomPanel />
  </GraphProduct>
</template>
