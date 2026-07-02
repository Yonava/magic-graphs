<script setup lang="ts">
  import ToolbarButtonGroup from '@magic/ui/core/toolbar/ToolbarButtonGroup.vue';

  import { computed } from 'vue';

  import { devMode, nonNullGraph as graph } from '../../shared/globalGraph.ts';
  import { useTreeGraphPositionerSync } from '../../shared/graph-tree-positioner/useTreeGraphPositionerSync.ts';
  import GToolbar from '../../shared/ui/graph-core/toolbar/GToolbarBase.vue';
  import GToolbarButton from '../../shared/ui/graph-core/toolbar/GToolbarButton.vue';
  import GToolbarDivider from '../../shared/ui/graph-core/toolbar/GToolbarDivider.vue';
  import GraphInfoMenu from './GraphInfoMenu/GraphInfoMenu.vue';
  import TreeShapeMenu from './TreeShapeMenu.vue';

  const toggleAnnotation = () => {
    const {
      activate: activate,
      deactivate: deactivate,
      isActive: isActive,
    } = graph.value.annotations;

    (isActive.value ? deactivate : activate)();
    graph.value.canvas.focused.value = true;
  };

  const { undo, redo } = graph.value.shortcut.trigger;

  const canUndo = computed(() => {
    const annotations = graph.value.annotations;
    const { canUndo } = graph.value.history;
    const { settings } = graph.value;
    if (annotations.isActive.value) return annotations.history.canUndo.value;
    return canUndo.value;
  });

  const canRedo = computed(() => {
    const annotations = graph.value.annotations;
    const { canRedo } = graph.value.history;
    const { settings } = graph.value;
    if (annotations.isActive.value) return annotations.history.canRedo.value;
    return canRedo.value;
  });

  const treePositionerControls = useTreeGraphPositionerSync(graph.value, {
    animate: true,
  });
</script>

<template>
  <GToolbar>
    <ToolbarButtonGroup class="gap-0">
      <GToolbarButton
        @click="graph.settings.isGraphWeighted = true"
        :active="graph.settings.isGraphWeighted"
        icon="label-outline"
      />

      <GToolbarDivider />

      <GToolbarButton
        @click="graph.settings.isGraphWeighted = false"
        :active="!graph.settings.isGraphWeighted"
        icon="label-off-outline"
      />
    </ToolbarButtonGroup>

    <ToolbarButtonGroup class="gap-0">
      <GToolbarButton
        @click="graph.settings.isGraphDirected = true"
        :active="graph.settings.isGraphDirected"
        icon="arrow-right-thin"
      />

      <GToolbarDivider />

      <GToolbarButton
        @click="graph.settings.isGraphDirected = false"
        :active="!graph.settings.isGraphDirected"
        icon="minus"
      />
    </ToolbarButtonGroup>

    <ToolbarButtonGroup class="gap-0">
      <GToolbarButton
        @click="undo.fn"
        :disabled="!canUndo"
        icon="undo"
      />

      <GToolbarDivider />

      <GToolbarButton
        @click="redo.fn"
        :disabled="!canRedo"
        icon="redo"
      />
    </ToolbarButtonGroup>

    <ToolbarButtonGroup>
      <GToolbarButton
        @click="toggleAnnotation"
        :active="graph.annotations.isActive.value"
        :icon="graph.annotations.isActive.value ? 'pencil' : 'pencil-outline'"
      />

      <GraphInfoMenu v-slot="{ toggle, isOpen }">
        <GToolbarButton
          @click="toggle"
          :active="isOpen"
          icon="information-outline"
        />
      </GraphInfoMenu>

      <TreeShapeMenu
        v-slot="{ toggle, isOpen }"
        :controls="treePositionerControls"
      >
        <GToolbarButton
          @click="toggle"
          :active="isOpen || treePositionerControls.isActive.value"
          :icon="
            isOpen || treePositionerControls.isActive.value
              ? 'forest'
              : 'forest-outline'
          "
        />
      </TreeShapeMenu>

      <GToolbarButton
        @click="devMode = !devMode"
        :active="devMode"
        icon="code-tags"
      />
    </ToolbarButtonGroup>
  </GToolbar>
</template>
