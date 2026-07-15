<script setup lang="ts">
  import { mdiPencil } from '@mdi/js';

  import IconButton from '../../components/icon-button/IconButton.vue';
  import HStack from '../../components/layout/HStack.vue';
  import Well from '../../components/layout/Well.vue';
  import { useProvidedGraph } from '../../product/useProvidedGraph.ts';
  import { useThemeToClasses } from '../../useThemeToClasses.ts';
  import AnnotationsIsland from './AnnotationsIsland.vue';
  import { useAnnotationControls } from './useAnnotationControls.ts';

  const graph = useProvidedGraph();
  const controls = useAnnotationControls();

  const annotationIslandComponentId = 'annotations-island';

  const toggle = () => {
    if (controls.isActive.value) {
      controls.deactivate();
      graph.magic.componentSlots.remove(annotationIslandComponentId);
      return;
    }

    controls.activate();
    graph.magic.componentSlots.add({
      id: annotationIslandComponentId,
      component: AnnotationsIsland,
      position: 'top-middle',
      priority: 2,
    });
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
        label="Annotations"
        :path="mdiPencil"
        :class="controls.isActive.value ? classes : 'border border-transparent'"
        @click="toggle"
      />
    </HStack>
  </Well>
</template>
