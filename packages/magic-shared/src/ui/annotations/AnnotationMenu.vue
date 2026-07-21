<script setup lang="ts">
  import { mdiPencil } from '@mdi/js';

  import HStack from '../../components/layout/HStack.vue';
  import Well from '../../components/layout/Well.vue';
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

    <Well>
      <HStack>
        <ToggleIconButton
          label="Annotations"
          :path="mdiPencil"
          @click="toggle"
        />
      </HStack>
    </Well>
  </HStack>
</template>
