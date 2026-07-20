<script setup lang="ts">
  import { mdiEraser, mdiLaserPointer, mdiPencil, mdiTrashCan } from '@mdi/js';

  import IconButton from '../../components/icon-button/IconButton.vue';
  import HStack from '../../components/layout/HStack.vue';
  import Well from '../../components/layout/Well.vue';
  import ToggleIconButton from '../../components/toggle-icon-button/ToggleIconButton.vue';
  import { ANNOTATION_MODES } from './constants.ts';
  import { AnnotationMode } from './types.ts';
  import { useAnnotationControls } from './useAnnotationControls.ts';

  const controls = useAnnotationControls();

  const modeToIcon: Record<AnnotationMode, string> = {
    drawing: mdiPencil,
    erasing: mdiEraser,
    laser: mdiLaserPointer,
  };

  const modeToLabel: Record<AnnotationMode, string> = {
    drawing: 'Draw',
    erasing: 'Erase',
    laser: 'Laser Pointer',
  };
</script>

<template>
  <Well>
    <HStack>
      <ToggleIconButton
        v-for="mode of ANNOTATION_MODES"
        :path="modeToIcon[mode]"
        :model-value="controls.mode() === mode"
        @click="controls.setMode(mode)"
        :aria-label="modeToLabel[mode]"
      />
      <IconButton
        :path="mdiTrashCan"
        @click="controls.clear()"
        label="Remove All Annotations"
      />
    </HStack>
  </Well>
</template>
