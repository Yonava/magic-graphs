<script setup lang="ts">
  import { MARKUP_SIZES } from '@product/sandbox/constants';
  import type { MarkupSize } from '@product/sandbox/types';
  import ButtonGroup from './ButtonGroup.vue';
  import GRadioButton from '@ui/graph/button/GRadioButton.vue';

  const activeSize = defineModel<MarkupSize>();
</script>

<template>
  <ButtonGroup>
    <GRadioButton
      v-for="size in MARKUP_SIZES"
      :key="size"
      @click="activeSize = size"
      :active="activeSize === size"
    >
      {{ size }}
    </GRadioButton>
  </ButtonGroup>
</template>
