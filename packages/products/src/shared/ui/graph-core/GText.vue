<script setup lang="ts">
  import { GraphThemeName } from '@magic/graph/plugins/canvas/themes/index';
  import type { Color } from '@magic/utils/colors';
  import colors from '@magic/utils/colors';

  import { type StyleValue, computed } from 'vue';

  import { nonNullGraph as graph } from '../../../shared/globalGraph.ts';

  const THEME_TO_TEXT_COLOR: Record<GraphThemeName, Color> = {
    light: colors.GRAY_900,
    dark: colors.GRAY_100,
    pink: colors.PINK_800,
  };

  const textColor = computed(
    () => THEME_TO_TEXT_COLOR[graph.value.canvas.themeName.value],
  );

  const styles = computed((): StyleValue => ({ color: textColor.value }));
</script>

<template>
  <div :style="styles">
    <slot></slot>
  </div>
</template>
