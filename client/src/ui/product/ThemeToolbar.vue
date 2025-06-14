<script setup lang="ts">
  import type { PreferredGraphTheme } from '@graph/themes/usePreferredTheme';
  import GToolbar from '@ui/graph/toolbar/GToolbarBase.vue';
  import GToolbarButton from '@ui/graph/toolbar/GToolbarButton.vue';
  import { nonNullGraph as graph } from '@graph/global';
  import ToolbarButtonGroup from '@ui/core/toolbar/ToolbarButtonGroup.vue';

  const themeNameToIcon: Record<PreferredGraphTheme, string> = {
    auto: 'cog-outline',
    light: 'weather-sunny',
    dark: 'weather-night',
    pink: 'flower-tulip-outline',
  };
</script>

<template>
  <GToolbar>
    <ToolbarButtonGroup>
      <GToolbarButton
        v-for="(val, key) in themeNameToIcon"
        :key="key"
        @click="graph.preferredTheme.value = key"
        :icon="val"
        :active="key === graph.preferredTheme.value"
      />
    </ToolbarButtonGroup>
  </GToolbar>
</template>
