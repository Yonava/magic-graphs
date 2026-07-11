<script setup lang="ts">
  import DropdownItem from '@core/components/DropdownItem';

  import { useThemeToClasses } from '../../useThemeToClasses.ts';

  const classes = useThemeToClasses({
    dark: 'text-white hover:bg-gray-700 data-[highlighted]:bg-gray-700',
    light: 'hover:bg-gray-100 data-[highlighted]:bg-gray-100',
  });
</script>

<template>
  <DropdownItem :class="classes">
    <slot />
  </DropdownItem>
</template>
