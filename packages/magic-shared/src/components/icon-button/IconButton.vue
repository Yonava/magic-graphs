<script setup lang="ts">
  import IconButton from '@core/components/IconButton';

  import { useThemeToClasses } from '../../useThemeToClasses.ts';

  const classes = useThemeToClasses({
    dark: 'bg-gray-900 text-white hover:bg-gray-700',
    light: 'bg-gray-200 text-gray-900 hover:bg-gray-100 active:bg-gray-100',
  });
</script>

<template>
  <IconButton :class="classes" />
</template>
