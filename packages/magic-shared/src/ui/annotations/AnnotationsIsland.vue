<script setup lang="ts">
  import {
    mdiAbjadArabic,
    mdiEraser,
    mdiLaserPointer,
    mdiPencil,
  } from '@mdi/js';

  import IconButton from '../../components/icon-button/IconButton.vue';
  import HStack from '../../components/layout/HStack.vue';
  import Well from '../../components/layout/Well.vue';
  import { useThemeToClasses } from '../../useThemeToClasses.ts';
  import { AnnotationMode } from './types.ts';
  import { useAnnotationControls } from './useAnnotationControls.ts';

  const controls = useAnnotationControls();

  const modes: AnnotationMode[] = ['drawing', 'erasing', 'laser'];
  const modeToIcon: Record<AnnotationMode, string> = {
    drawing: mdiPencil,
    erasing: mdiEraser,
    laser: mdiLaserPointer,
  };

  const classes = useThemeToClasses({
    dark: 'border border-white',
    light: 'border border-black',
  });
</script>

<template>
  <Well>
    <HStack>
      <IconButton
        v-for="mode of modes"
        :path="modeToIcon[mode]"
        :class="
          controls.mode() === mode ? classes : 'border border-transparent'
        "
        @click="controls.setMode(mode)"
      />
    </HStack>
  </Well>
</template>
