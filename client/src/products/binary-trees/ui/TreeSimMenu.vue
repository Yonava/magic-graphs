<script setup lang="ts">
  import type { TreeSim } from '../state';
  import GButton from '@ui/graph/button/GButton.vue';
  import GWell from '@ui/graph/GWell.vue';
  import { useTreeTraceExplainer } from './useTreeTraceExplainer';
  import { ref } from 'vue';

  const props = defineProps<{
    controls: TreeSim;
  }>();

  // animationCooldown prevents the glitchy effect that happens when
  // you skip back and forth before a tree animation sequence has completed
  const animationCooldown = ref(false);

  const startCooldown = () => {
    animationCooldown.value = true;
    setTimeout(() => (animationCooldown.value = false), 1000);
  };

  const prev = () => {
    startCooldown();
    props.controls.prev();
  };

  const next = () => {
    startCooldown();
    props.controls.next();
  };

  const explainer = useTreeTraceExplainer();
</script>

<template>
  <div>
    <div>
      <h1 class="mb-2 font-bold text-2xl">
        {{ explainer ?? 'N/A' }}
      </h1>
    </div>
    <div>
      <GWell
        secondary
        class="rounded-lg flex gap-2 p-2"
      >
        <GButton
          @click="prev"
          tertiary
          :disabled="props.controls.step.value === 0 || animationCooldown"
        >
          <- prev
        </GButton>
        <GButton
          @click="next"
          tertiary
          :disabled="
            props.controls.trace.value.length - 1 ===
              props.controls.step.value || animationCooldown
          "
        >
          next ->
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
