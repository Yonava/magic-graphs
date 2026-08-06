<script setup lang="ts">
  import { computed } from 'vue';

  import ExplainerText from '../../explainer/ExplainerText.vue';
  import { useRunningSimulation } from '../useRunningSimulation.ts';

  const { explainer, violation } = useRunningSimulation();

  const displayedExplainer = computed(
    () => violation.value?.explainer ?? explainer.value,
  );
</script>

<template>
  <ExplainerText :explainer="displayedExplainer" />
</template>
