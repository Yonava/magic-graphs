<script setup lang="ts">
  import colors from '@utils/colors';

  withDefaults(
    defineProps<{
      color?: string;
      textColor?: string;
    }>(),
    {
      color: colors.GRAY_800,
      textColor: colors.WHITE,
    },
  );
</script>

<template>
  <div
    :style="{
      backgroundColor: color,
      color: textColor,
    }"
  >
    <slot><!-- optional fallback --></slot>
  </div>
</template>
