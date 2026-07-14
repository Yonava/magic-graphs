<script setup lang="ts">
  import { useThemeToClasses } from '../../useThemeToClasses.ts';
  import { useRunningSimulation } from '../useRunningSimulation.ts';

  const { explainer } = useRunningSimulation();

  const classes = useThemeToClasses({
    dark: 'text-white',
    light: 'text-black',
  });
</script>

<template>
  <div :class="`${classes} text-2xl`">
    {{ explainer }}
  </div>
</template>
