<script setup lang="ts">
  import type { TreeSim } from '../state';
  import GButton from '@ui/graph/button/GButton.vue';
  import GWell from '@ui/graph/GWell.vue';
  // import { useTreeTraceExplainer } from './useTreeTraceExplainer';

  const props = defineProps<{
    controls: TreeSim;
  }>();

  // const explainer = useTreeTraceExplainer();
</script>

<template>
  <div class="">
    <!-- <div>
      <h1 class="mb-2 font-bold text-2xl">
        {{ explainer ?? 'N/A' }}
      </h1>
    </div> -->
    <div>
      <GWell
        secondary
        class="rounded-lg flex gap-2 p-2"
      >
        <GButton
          @click="props.controls.prev"
          tertiary
          :disabled="props.controls.step.value === 0"
        >
          👈 prev
        </GButton>
        <GButton
          @click="props.controls.next"
          tertiary
          :disabled="
            props.controls.trace.value.length - 1 === props.controls.step.value
          "
        >
          next 👉
        </GButton>
        <GButton
          @click="props.controls.exit"
          tertiary
        >
          Done
        </GButton>
      </GWell>
    </div>
  </div>
</template>
