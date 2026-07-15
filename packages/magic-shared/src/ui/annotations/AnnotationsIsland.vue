<script setup lang="ts">
  import { mdiEraser, mdiLaserPointer } from '@mdi/js';

  import IconButton from '../../components/icon-button/IconButton.vue';
  import HStack from '../../components/layout/HStack.vue';
  import Well from '../../components/layout/Well.vue';
  import { useThemeToClasses } from '../../useThemeToClasses.ts';
  import { useAnnotationControls } from './useAnnotationControls.ts';

  const controls = useAnnotationControls();

  const toggleEraser = () => {
    controls.isErasing.value = !controls.isErasing.value;
  };

  const toggleLaser = () => {
    controls.isLaserPointing.value = !controls.isLaserPointing.value;
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
        :path="mdiEraser"
        :class="
          controls.isErasing.value ? classes : 'border border-transparent'
        "
        @click="toggleEraser"
      />
      <IconButton
        :path="mdiLaserPointer"
        :class="
          controls.isLaserPointing.value ? classes : 'border border-transparent'
        "
        @click="toggleLaser"
      />
    </HStack>
  </Well>
</template>
