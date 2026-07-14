<script setup lang="ts">
  import ToggleButton from '@core/components/ToggleButton';

  import { useThemeToClasses } from '../../useThemeToClasses.ts';

  const pressed = defineModel<boolean>();

  const classes = useThemeToClasses({
    dark: 'border-gray-700 text-white hover:bg-gray-700 data-[state=on]:bg-white data-[state=on]:text-gray-900',
    light:
      'border-gray-400 bg-gray-200 hover:bg-gray-100 data-[state=on]:bg-gray-900 data-[state=on]:text-white',
  });
</script>

<template>
  <ToggleButton
    v-model="pressed"
    :class="classes"
  >
    <slot />
  </ToggleButton>
</template>
