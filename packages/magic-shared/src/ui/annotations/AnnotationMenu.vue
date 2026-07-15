<script setup lang="ts">
  import { mdiEraser, mdiPencil } from '@mdi/js';

  import IconButton from '../../components/icon-button/IconButton.vue';
  import HStack from '../../components/layout/HStack.vue';
  import Well from '../../components/layout/Well.vue';
  import { useThemeToClasses } from '../../useThemeToClasses.ts';
  import { useAnnotationControls } from './useAnnotationControls.ts';

  const controls = useAnnotationControls();
  const toggle = () => {
    controls.isActive.value ? controls.deactivate() : controls.activate();
  };
  const toggleEraser = () => {
    controls.isErasing.value = !controls.isErasing.value;
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
        :path="mdiPencil"
        :class="controls.isActive.value ? classes : 'border border-transparent'"
        @click="toggle"
      />
      <IconButton
        :path="mdiEraser"
        :class="
          controls.isErasing.value ? classes : 'border border-transparent'
        "
        @click="toggleEraser"
      />
    </HStack>
  </Well>
</template>
