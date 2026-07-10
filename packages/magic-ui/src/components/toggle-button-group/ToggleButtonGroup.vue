<script setup lang="ts">
  import ToggleButtonGroup from '@core/components/ToggleButtonGroup';

  import { useThemeToClasses } from '../../useThemeToClasses.ts';

  const selected = defineModel<string>();

  const classes = useThemeToClasses({
    dark: 'divide-gray-700 border-gray-700',
    light: 'divide-gray-300 border-gray-300',
  });
</script>

<template>
  <ToggleButtonGroup v-model="selected" :class="classes">
    <slot />
  </ToggleButtonGroup>
</template>
