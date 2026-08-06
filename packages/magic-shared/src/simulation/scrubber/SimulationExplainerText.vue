<script setup lang="ts">
  import { computed } from 'vue';

  import { useRunningSimulation } from '../useRunningSimulation.ts';
  import ExplainerText from './ExplainerText.vue';

  const { explainer, violation } = useRunningSimulation();

  const displayedExplainer = computed(
    () => violation.value?.explainer ?? explainer.value,
  );
</script>

<template>
  <ExplainerText :explainer="displayedExplainer" />
</template>
