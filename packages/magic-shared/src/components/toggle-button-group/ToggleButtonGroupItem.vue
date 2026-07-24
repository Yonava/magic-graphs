<script setup lang="ts">
  import ToggleButtonGroupItem from '@core/components/ToggleButtonGroupItem';

  import { useThemeToClasses } from '../../useThemeToClasses.ts';

  const classes = useThemeToClasses({
    dark: 'text-white hover:bg-gray-700 aria-pressed:bg-white aria-pressed:text-gray-900',
    light: 'hover:bg-gray-100 aria-pressed:bg-gray-900 aria-pressed:text-white',
  });
</script>

<template>
  <ToggleButtonGroupItem :class="classes">
    <slot />
  </ToggleButtonGroupItem>
</template>
