<script setup lang="ts">
  import { Fraction } from 'mathjs';

  import GraphProduct from '../shared/ui/general/GraphProduct.vue';
  import { useGraphWithCanvas } from '../shared/useGraphWithCanvas.ts';
  import { isRunning } from './sim/runner.ts';
  import CostDisplay from './ui/CostDisplay.vue';

  const graphWithCanvas = useGraphWithCanvas({
    interactive: {
      addedEdgeRuleNoSelfLoops: true,
      addedEdgeRuleOneEdgePerPath: true,
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
  <GraphProduct v-bind="graphWithCanvas">
    <template #center-left-sim>
      <div class="bg-gray-800 bg-opacity-80 p-2 rounded-xl overflow-auto">
        <CostDisplay :key="String(isRunning)" />
      </div>
    </template>
  </GraphProduct>
</template>
