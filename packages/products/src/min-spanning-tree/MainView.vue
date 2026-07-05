<script setup lang="ts">
  import { Fraction } from 'mathjs';

  import GraphProduct from '../shared/ui/general/GraphProduct.vue';
  import { useGraphWithCanvas } from '../shared/useGraphWithCanvas.ts';

  const graphWithCanvas = useGraphWithCanvas({
    core: {
      isGraphDirected: false,
      edgeInputToWeight: (input) => {
        // fraction throws an error if the input cannot be parsed or
        // is a divide by zero operation
        try {
          const fraction = new Fraction(input);
          // dijkstras only works on positive weight edges
          if (fraction.valueOf() <= 0) return;
          return fraction;
        } catch {}
      },
    },
  });
</script>

<template>
  <GraphProduct v-bind="graphWithCanvas" />
</template>
