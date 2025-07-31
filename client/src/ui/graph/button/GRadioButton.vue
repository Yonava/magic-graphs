<script setup lang="ts">
  import { useNonNullGraphColors } from '@graph/themes/useGraphColors';
  import CRadioButton from '@ui/core/button/RadioButton.vue';

  const colors = useNonNullGraphColors();
</script>

<template>
  <CRadioButton
    v-bind="$attrs"
    :color="colors.secondary"
    :outline-color="colors.text"
  >
    <slot></slot>
  </CRadioButton>
</template>
