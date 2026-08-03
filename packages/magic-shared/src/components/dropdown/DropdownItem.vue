<script setup lang="ts">
  import DropdownItem from '@core/components/DropdownItem';

  import { useThemeToClasses } from '../../useThemeToClasses.ts';

  const classes = useThemeToClasses({
    dark: 'text-white hover:bg-gray-700 focus-visible:bg-gray-700 data-[highlighted]:bg-gray-700',
    light: 'hover:bg-gray-100 focus-visible:bg-gray-100 data-[highlighted]:bg-gray-100',
  });
</script>

<template>
  <!-- the highlight background marks keyboard position, so a focus ring on top of it is redundant -->
  <DropdownItem
    class="focus-visible:ring-0 focus-visible:ring-offset-0"
    :class="classes"
  >
    <slot />
  </DropdownItem>
</template>
