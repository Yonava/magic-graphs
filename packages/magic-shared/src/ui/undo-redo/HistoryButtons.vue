<script lang="ts" setup>
  import { mdiRedo, mdiUndo } from '@mdi/js';

  import IconButton from '../../components/icon-button/IconButton.vue';
  import HStack from '../../components/layout/HStack.vue';
  import { useProvidedGraph } from '../../product/useProvidedGraph.ts';

  const graph = useProvidedGraph();
  const { canRedo, canUndo, undo, redo } = graph.history;
</script>

<template>
  <HStack>
    <IconButton
      @click="undo"
      :disabled="!canUndo"
      class="p-4"
      label="Undo"
      :size="20"
      :path="mdiUndo"
    />
    <IconButton
      @click="redo"
      :disabled="!canRedo"
      class="p-4"
      label="Redo"
      :size="20"
      :path="mdiRedo"
    />
  </HStack>
</template>
