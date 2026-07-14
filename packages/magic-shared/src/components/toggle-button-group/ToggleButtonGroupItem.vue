<script setup lang="ts">
  import ToggleButtonGroupItem from '@core/components/ToggleButtonGroupItem';

  import { useThemeToClasses } from '../../useThemeToClasses.ts';

  const classes = useThemeToClasses({
    dark: 'text-white hover:bg-gray-700 data-[state=on]:bg-white data-[state=on]:text-gray-900',
    light:
      'hover:bg-gray-100 data-[state=on]:bg-gray-900 data-[state=on]:text-white',
  });
</script>

<template>
  <ToggleButtonGroupItem :class="classes">
    <slot />
  </ToggleButtonGroupItem>
</template>
