<script setup lang="ts">
  import ToggleIconButton from '@core/components/ToggleIconButton';

  import { useThemeToClasses } from '../../useThemeToClasses.ts';
  import { toggleIconButton } from './classes.ts';

  const pressed = defineModel<boolean>();

  const classes = useThemeToClasses(toggleIconButton);
</script>

<template>
  <ToggleIconButton
    v-model="pressed"
    :class="classes"
  />
</template>
