<script setup lang="ts">
  import { MARKUP_COLORS } from '@product/sandbox/constants';
  import type { Color } from '@utils/colors';
  import ButtonGroup from './ButtonGroup.vue';
  import GRadioButton from '@ui/graph/button/GRadioButton.vue';

  const activeColor = defineModel<Color>();
</script>

<template>
  <ButtonGroup>
    <GRadioButton
      v-for="color in MARKUP_COLORS"
      :key="color"
      @click="activeColor = color"
      :active="activeColor === color"
      :color="color"
    ></GRadioButton>
  </ButtonGroup>
</template>
