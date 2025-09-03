<script setup lang="ts">
  import { useNonNullGraphColors } from "@magic/products/shared/useGlobalGraphColors";
  import CRadioButton from "@magic/ui/core/button/RadioButton.vue";

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
