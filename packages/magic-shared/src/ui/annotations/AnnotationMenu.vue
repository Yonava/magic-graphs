<script setup lang="ts">
  import {
    mdiBrightnessAuto,
    mdiCog,
    mdiDesktopTower,
    mdiDesktopTowerMonitor,
    mdiFullscreen,
    mdiPencil,
    mdiThemeLightDark,
    mdiWeatherNight,
    mdiWhiteBalanceSunny,
  } from '@mdi/js';

  import Button from '../../components/button/Button.vue';
  import Dropdown from '../../components/dropdown/Dropdown.vue';
  import Icon from '../../components/icon/Icon.vue';
  import HStack from '../../components/layout/HStack.vue';
  import VStack from '../../components/layout/VStack.vue';
  import Well from '../../components/layout/Well.vue';
  import ToggleButtonGroup from '../../components/toggle-button-group/ToggleButtonGroup.vue';
  import ToggleButtonGroupItem from '../../components/toggle-button-group/ToggleButtonGroupItem.vue';
  import ToggleIconButton from '../../components/toggle-icon-button/ToggleIconButton.vue';
  import AnnotationsIsland from './AnnotationsIsland.vue';
  import { useAnnotationControls } from './useAnnotationControls.ts';

  const controls = useAnnotationControls();

  const toggle = () => {
    if (controls.isActive.value) {
      controls.deactivate();
      return;
    }

    controls.activate();
  };
</script>

<template>
  <HStack>
    <AnnotationsIsland v-if="controls.isActive.value" />

    <Well class="p-0 rounded-full overflow-hidden">
      <ToggleIconButton
        class="bg-transparent p-4"
        label="Annotations"
        :size="20"
        :path="mdiPencil"
        @click="toggle"
      />
    </Well>

    <Well class="p-0 rounded-full overflow-hidden">
      <Dropdown
        side="top"
        align="end"
      >
        <template #trigger>
          <ToggleIconButton
            label="Settings"
            class="p-4 bg-transparent"
            :size="20"
            :path="mdiCog"
          />
        </template>
        <VStack class="gap-1 px-1">
          <Button class="px-2 bg-transparent w-full justify-start">
            <template #start>
              <Icon :path="mdiFullscreen" />
            </template>
            Fullscreen
          </Button>
          <div
            class="w-full bg-white opacity-10"
            :style="{ height: '1px' }"
          ></div>
          <VStack class="py-2">
            <HStack class="px-2 font-bold bg-transparent w-full justify-start">
              <Icon :path="mdiThemeLightDark" />
              Appearance
            </HStack>
            <div>
              <ToggleButtonGroup>
                <ToggleButtonGroupItem value="left">
                  <Icon
                    :size="18"
                    :path="mdiWhiteBalanceSunny"
                  />
                </ToggleButtonGroupItem>
                <ToggleButtonGroupItem value="center">
                  <Icon
                    :size="18"
                    :path="mdiWeatherNight"
                  />
                </ToggleButtonGroupItem>
                <ToggleButtonGroupItem value="right">
                  <Icon
                    :size="18"
                    :path="mdiDesktopTower"
                  />
                </ToggleButtonGroupItem>
              </ToggleButtonGroup>
            </div>
          </VStack>
        </VStack>
      </Dropdown>
    </Well>
  </HStack>
</template>
