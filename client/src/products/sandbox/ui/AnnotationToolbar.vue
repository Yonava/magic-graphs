<script setup lang="ts">
  import { COLORS, BRUSH_WEIGHTS } from '@graph/plugins/annotations/constants';
  import { nonNullGraph as graph } from '@graph/global';
  import type { Color } from '@utils/colors';
  import GToolbar from '@ui/graph/toolbar/GToolbarBase.vue';
  import GToolbarButton from '@ui/graph/toolbar/GToolbarButton.vue';
  import GToolbarButtonDivider from '@ui/graph/toolbar/GToolbarDivider.vue';
  import ToolbarButtonGroup from '@ui/core/toolbar/ToolbarButtonGroup.vue';

  const { clear, brushWeight, isErasing, color, isLaserPointing } =
    graph.value.annotation;

  const selectColor = (newColor: Color) => {
    color.value = newColor;
    isErasing.value = false;
    isLaserPointing.value = false;
  };

  const selectBrushWeight = (newBrushWeight: number) => {
    brushWeight.value = newBrushWeight;
    isErasing.value = false;
    isLaserPointing.value = false;
  };

  const isColorActive = (newColor: Color) => {
    if (isErasing.value || isLaserPointing.value) return false;
    return color.value === newColor;
  };

  const isBrushWeightActive = (newBrushWeight: number) => {
    if (isErasing.value) return false;
    return brushWeight.value === newBrushWeight;
  };

  const toggleErasing = () => {
    isErasing.value = !isErasing.value;
    isLaserPointing.value = false;
  };

  const toggleLaserPointing = () => {
    isLaserPointing.value = !isLaserPointing.value;
    isErasing.value = false;
  };
</script>

<template>
  <GToolbar>
    <ToolbarButtonGroup>
      <GToolbarButton
        v-for="color in COLORS"
        :key="color"
        @click="selectColor(color)"
        :active="isColorActive(color)"
      >
        <div :class="['rounded-full', 'p-[3px]']">
          <div
            :style="{ backgroundColor: color }"
            :class="['w-6', 'h-6', 'rounded-full']"
          ></div>
        </div>
      </GToolbarButton>
    </ToolbarButtonGroup>

    <GToolbarButtonDivider />

    <ToolbarButtonGroup>
      <GToolbarButton
        v-for="(weight, index) in BRUSH_WEIGHTS"
        :key="weight"
        @click="selectBrushWeight(weight)"
        :active="isBrushWeightActive(weight)"
      >
        <div
          :class="['bg-gray-400', 'rounded-md', 'w-[15px]']"
          :style="{ height: `${index * 5 + 1}px` }"
        ></div>
      </GToolbarButton>
    </ToolbarButtonGroup>

    <GToolbarButtonDivider />

    <ToolbarButtonGroup>
      <GToolbarButton
        @click="toggleLaserPointing"
        :active="isLaserPointing"
        icon="laser-pointer"
      />
      <GToolbarButton
        @click="toggleErasing"
        :active="isErasing"
        icon="eraser"
      />

      <GToolbarButton
        @click="clear"
        icon="delete-outline"
      />
    </ToolbarButtonGroup>
  </GToolbar>
</template>
