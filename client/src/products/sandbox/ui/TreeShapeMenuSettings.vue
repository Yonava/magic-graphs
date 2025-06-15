<script setup lang="ts">
  import { computed } from 'vue';
  import { TREE_FORMATION_OPTIONS_DEFAULTS } from './tree/useTreeShaper';
  import type {
    AutoTreeControls,
    TreeFormationOptions,
  } from './tree/useTreeShaper';
  import CPopover from '@ui/core/Popover.vue';
  import GWell from '@ui/graph/GWell.vue';
  import GButton from '@ui/graph/button/GButton.vue';
  import InputRange from '@ui/InputRange.vue';
  import CIcon from '@ui/core/Icon.vue';

  const props = defineProps<{
    controls: AutoTreeControls;
  }>();

  const { options, debouncedUpdateShape, updateShape } = props.controls;

  const showOffsetXDefaultButton = computed(() => {
    return options.value.xOffset !== TREE_FORMATION_OPTIONS_DEFAULTS.xOffset;
  });

  const showOffsetYDefaultButton = computed(() => {
    return options.value.yOffset !== TREE_FORMATION_OPTIONS_DEFAULTS.yOffset;
  });

  const setOffsetXToDefault = () => {
    options.value.xOffset = TREE_FORMATION_OPTIONS_DEFAULTS.xOffset;
    debouncedUpdateShape();
  };

  const setOffsetYToDefault = () => {
    options.value.yOffset = TREE_FORMATION_OPTIONS_DEFAULTS.yOffset;
    debouncedUpdateShape();
  };

  const setShape = (shape: TreeFormationOptions['shape']) => {
    options.value.shape = shape;
    updateShape();
  };
</script>

<template>
  <CPopover :offset="5">
    <template #activator="{ toggle }">
      <GButton @click="toggle">
        <CIcon icon="cog" />
      </GButton>
    </template>

    <GWell class="p-3 flex flex-col gap-4 w-52 rounded-md shadow-lg">
      <div>
        <h2 class="font-bold text-sm">Tree Offset X ({{ options.xOffset }})</h2>
        <InputRange
          v-model="options.xOffset"
          @update:model-value="controls.debouncedUpdateShape"
          :min="0"
          :max="TREE_FORMATION_OPTIONS_DEFAULTS.xOffset * 2"
          class="w-full"
        />
        <GButton
          v-if="showOffsetXDefaultButton"
          @click="setOffsetXToDefault"
          contrast
          class="text-xs"
        >
          Set To Default
        </GButton>
      </div>
      <div>
        <h2 class="font-bold text-sm">Tree Offset Y ({{ options.yOffset }})</h2>
        <InputRange
          v-model="options.yOffset"
          @update:model-value="controls.debouncedUpdateShape"
          :min="0"
          :max="TREE_FORMATION_OPTIONS_DEFAULTS.yOffset * 2"
          class="w-full"
        />
        <GButton
          v-if="showOffsetYDefaultButton"
          @click="setOffsetYToDefault"
          contrast
          class="text-xs"
        >
          Set To Default
        </GButton>
      </div>
      <div class="flex flex-col gap-2">
        <h2 class="font-bold text-lg">Shape</h2>
        <GButton
          @click="setShape('standard')"
          :secondary="options.shape === 'standard'"
          :tertiary="options.shape !== 'standard'"
          :disabled="options.shape === 'standard'"
        >
          Standard
        </GButton>
        <GButton
          @click="setShape('binary')"
          :secondary="options.shape === 'binary'"
          :tertiary="options.shape !== 'binary'"
          :disabled="options.shape === 'binary'"
        >
          Binary
        </GButton>
      </div>
    </GWell>
  </CPopover>
</template>
