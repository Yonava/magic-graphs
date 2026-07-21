<script setup lang="ts">
  import {
    mdiDesktopTower,
    mdiThemeLightDark,
    mdiWeatherNight,
    mdiWhiteBalanceSunny,
  } from '@mdi/js';
  import { BasicColorSchema, useColorMode } from '@vueuse/core';

  import { computed, watch } from 'vue';

  import Icon from '../../components/icon/Icon.vue';
  import HStack from '../../components/layout/HStack.vue';
  import VStack from '../../components/layout/VStack.vue';
  import ToggleButtonGroup from '../../components/toggle-button-group/ToggleButtonGroup.vue';
  import ToggleButtonGroupItem from '../../components/toggle-button-group/ToggleButtonGroupItem.vue';
  import Tooltip from '../../components/tooltip/Tooltip.vue';
  import { useProvidedGraph } from '../../product/useProvidedGraph.ts';

  const appearances: BasicColorSchema[] = ['light', 'dark', 'auto'];

  const appearanceToDisplayString: Record<BasicColorSchema, string> = {
    auto: 'System Preference',
    dark: 'Dark Mode',
    light: 'Light Mode',
  };

  const appearanceToIcon: Record<BasicColorSchema, string> = {
    light: mdiWhiteBalanceSunny,
    dark: mdiWeatherNight,
    auto: mdiDesktopTower,
  };

  const activeAppearance = useColorMode({ emitAuto: true });

  const graph = useProvidedGraph();

  watch(activeAppearance, () => {
    graph.theme.activePresetName.value = activeAppearance.state.value;
  });
</script>

<template>
  <VStack class="py-2">
    <HStack class="px-2 font-bold bg-transparent w-full justify-start">
      <Icon :path="mdiThemeLightDark" />
      Appearance
    </HStack>
    <div>
      <ToggleButtonGroup v-model="activeAppearance">
        <template
          v-for="appearance in appearances"
          :key="appearance"
        >
          <Tooltip :label="appearanceToDisplayString[appearance]">
            <template #trigger>
              <ToggleButtonGroupItem :value="appearance">
                <Icon
                  :size="18"
                  :path="appearanceToIcon[appearance]"
                />
              </ToggleButtonGroupItem>
            </template>
          </Tooltip>
        </template>
      </ToggleButtonGroup>
    </div>
  </VStack>
</template>
