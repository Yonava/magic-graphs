<script setup lang="ts">
  import { PreferredThemePresent } from '@magic/graph/plugins/canvas/themes/usePreferredThemePreset';
  import ToolbarButtonGroup from '@magic/ui/core/toolbar/ToolbarButtonGroup.vue';

  import { nonNullGraph as graph } from '../../../shared/globalGraph.ts';
  import GToolbar from '../../../shared/ui/graph-core/toolbar/GToolbarBase.vue';
  import GToolbarButton from '../../../shared/ui/graph-core/toolbar/GToolbarButton.vue';

  const themePresetToIcon: Record<PreferredThemePresent, string> = {
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
        v-for="(val, key) in themePresetToIcon"
        :key="key"
        @click="graph.preferredTheme.value = key"
        :icon="val"
        :active="key === graph.preferredTheme.value"
      />
    </ToolbarButtonGroup>
  </GToolbar>
</template>
