<script setup lang="ts">
  import Dropdown from '@core/components/Dropdown';

  import { useThemeToClasses } from '../../useThemeToClasses.ts';

  const classes = useThemeToClasses({
    dark: 'bg-gray-800 border-gray-700 text-white',
    light: 'bg-gray-300 border-gray-200 text-gray-900',
  });
</script>

<template>
  <Dropdown :class="classes">
    <template #trigger><slot name="trigger" /></template>
    <slot />
  </Dropdown>
</template>
