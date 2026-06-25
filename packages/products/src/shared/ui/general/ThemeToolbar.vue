<script setup lang="ts">
  import ToolbarButtonGroup from '@magic/ui/core/toolbar/ToolbarButtonGroup.vue';

  import { nonNullGraph as graph } from '../../../shared/globalGraph.ts';
  import GToolbar from '../../../shared/ui/graph-core/toolbar/GToolbarBase.vue';
  import GToolbarButton from '../../../shared/ui/graph-core/toolbar/GToolbarButton.vue';

  const themePresetToIcon = {
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
        :icon="val"
        :active="key === graph.themePresets.activePresetName()"
      />
    </ToolbarButtonGroup>
  </GToolbar>
</template>
