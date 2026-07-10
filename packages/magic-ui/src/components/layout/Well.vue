<script setup lang="ts">
  import Well from '@core/components/Well';

  import { useThemeToClasses } from '../../useThemeToClasses.ts';

  const classes = useThemeToClasses({
    dark: 'bg-gray-800 text-white',
    light: 'bg-gray-300',
  });
</script>

<template>
  <Well :class="classes">
    <slot></slot>
  </Well>
</template>
