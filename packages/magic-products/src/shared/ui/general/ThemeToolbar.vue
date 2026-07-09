<script setup lang="ts">
  import ToolbarButtonGroup from '@core/ui/core/toolbar/ToolbarButtonGroup.vue';

  import { nonNullGraph as graph } from '../../../shared/globalGraph.ts';
  import GToolbar from '../../../shared/ui/graph-core/toolbar/GToolbarBase.vue';
  import GToolbarButton from '../../../shared/ui/graph-core/toolbar/GToolbarButton.vue';
  import { ThemePreset } from '../../useGraph.ts';

  const themePresetToIcon: Record<ThemePreset, string> = {
    // TODO add auto back in
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
        @click="graph.activePreset.value = key"
        :key="key"
        :icon="val"
        :active="key === graph.activePreset.value"
      />
    </ToolbarButtonGroup>
  </GToolbar>
</template>
