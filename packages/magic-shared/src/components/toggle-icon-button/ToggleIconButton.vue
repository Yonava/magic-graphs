<script setup lang="ts">
  import ToggleIconButton from '@core/components/ToggleIconButton';

  import { useThemeToClasses } from '../../useThemeToClasses.ts';
  import { toggleButton } from '../toggle-button/classes.ts';

  const pressed = defineModel<boolean>();

  const classes = useThemeToClasses(toggleButton);
</script>

<template>
  <ToggleIconButton
    v-model="pressed"
    :class="classes"
  />
</template>
