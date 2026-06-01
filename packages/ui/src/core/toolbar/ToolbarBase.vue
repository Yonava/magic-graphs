<script setup lang="ts">
  import colors from '@magic/utils/colors';

  withDefaults(
    defineProps<{
      color?: string;
    }>(),
    {
      color: colors.GRAY_800,
      hint: undefined,
    },
  );
</script>

<template>
  <div class="flex flex-col gap-2">
    <div
      :style="{ backgroundColor: color }"
      class="flex items-center gap-2 py-1 px-1 rounded-lg"
    >
      <slot></slot>
    </div>
    <slot name="hint"></slot>
  </div>
</template>
