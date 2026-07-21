<script setup lang="ts">
  import { mdiCog } from '@mdi/js';

  import Dropdown from '../../components/dropdown/Dropdown.vue';
  import HStack from '../../components/layout/HStack.vue';
  import VStack from '../../components/layout/VStack.vue';
  import Well from '../../components/layout/Well.vue';
  import ToggleIconButton from '../../components/toggle-icon-button/ToggleIconButton.vue';
  import { useProvidedGraph } from '../../product/useProvidedGraph.ts';
  import AnnotationToggle from '../annotations/AnnotationToggle.vue';
  import AppearanceToggle from '../appearance/AppearanceToggle.vue';
  import FullscreenButton from '../fullscreen/FullscreenButton.vue';

  const graph = useProvidedGraph();
</script>

<template>
  <HStack>
    <AnnotationToggle v-if="graph.magic.ui.data.annotations" />

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
          <FullscreenButton />
          <div
            class="w-full bg-white opacity-10"
            :style="{ height: '1px' }"
          ></div>
          <AppearanceToggle />
        </VStack>
      </Dropdown>
    </Well>
  </HStack>
</template>
