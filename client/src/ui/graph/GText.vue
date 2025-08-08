<script setup lang="ts">
  import { nonNullGraph as graph } from '@graph/global';
  import type { GraphThemeName } from '@graph/themes';
  import type { Color } from '@utils/colors';
  import colors from '@utils/colors';

  import { type StyleValue, computed } from 'vue';

  const THEME_TO_TEXT_COLOR: Record<GraphThemeName, Color> = {
    light: colors.GRAY_900,
    dark: colors.GRAY_100,
    pink: colors.PINK_800,
  };

  const textColor = computed(
    () => THEME_TO_TEXT_COLOR[graph.value.themeName.value],
  );

  const styles = computed((): StyleValue => ({ color: textColor.value }));
</script>

<template>
  <div :style="styles">
    <slot></slot>
  </div>
</template>
