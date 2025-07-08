<script setup lang="ts">
  import { computed } from 'vue';
  import { nonNullGraph as graph } from '@graph/global';
  import { useGraphTutorial } from '@graph/tutorials/useGraphTutorial';
  import GToolbar from '@ui/graph/toolbar/GToolbarBase.vue';
  import GToolbarButton from '@ui/graph/toolbar/GToolbarButton.vue';
  import GToolbarDivider from '@ui/graph/toolbar/GToolbarDivider.vue';
  import ToolbarButtonGroup from '@ui/core/toolbar/ToolbarButtonGroup.vue';
  import GraphInfoMenu from './GraphInfoMenu/GraphInfoMenu.vue';
  import CollaborativeSessionMenu from './CollaborativeSessionMenu.vue';
  import TreeShapeMenu from './TreeShapeMenu.vue';
  import { useAutoTree } from './tree/useTreeShaper';
  // import TemplateMenu from '@graph/templates/ui/TemplateMenu.vue';

  const tutorial = useGraphTutorial(graph.value, [
    {
      dismiss: 'onNodeAdded',
      hint: 'Double click on the canvas to add a node.',
    },
    {
      dismiss: 'onEdgeAdded',
      hint: 'Hover node to show anchors, drag between them to add an edge.',
    },
  ]);

  tutorial.start();

  const toggleAnnotation = () => {
    const {
      activate: activate,
      deactivate: deactivate,
      isActive: isActive,
    } = graph.value.annotation;

    (isActive.value ? deactivate : activate)();
    graph.value.canvasFocused.value = true;
  };

  const { undo, redo } = graph.value.shortcut.trigger;

  const canUndo = computed(() => {
    const { isActive: annotationActive, canUndo: canUndoAnnotation } =
      graph.value.annotation;
    const { canUndo } = graph.value.history;
    const { settings } = graph.value;
    if (annotationActive.value) return canUndoAnnotation.value;
    if (!settings.value.interactive) return false;
    return canUndo.value;
  });

  const canRedo = computed(() => {
    const { isActive: annotationActive, canRedo: canRedoAnnotation } =
      graph.value.annotation;
    const { canRedo } = graph.value.history;
    const { settings } = graph.value;
    if (annotationActive.value) return canRedoAnnotation.value;
    if (!settings.value.interactive) return false;
    return canRedo.value;
  });

  const treeControls = useAutoTree(graph.value);
</script>

<template>
  <GToolbar :hint="tutorial">
    <ToolbarButtonGroup class="gap-0">
      <GToolbarButton
        @click="graph.settings.value.displayEdgeLabels = true"
        :active="graph.settings.value.displayEdgeLabels"
        icon="label-outline"
      />

      <GToolbarDivider />

      <GToolbarButton
        @click="graph.settings.value.displayEdgeLabels = false"
        :active="!graph.settings.value.displayEdgeLabels"
        icon="label-off-outline"
      />
    </ToolbarButtonGroup>

    <ToolbarButtonGroup class="gap-0">
      <GToolbarButton
        @click="graph.settings.value.isGraphDirected = true"
        :active="graph.settings.value.isGraphDirected"
        icon="arrow-right-thin"
      />

      <GToolbarDivider />

      <GToolbarButton
        @click="graph.settings.value.isGraphDirected = false"
        :active="!graph.settings.value.isGraphDirected"
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
        :active="graph.annotation.isActive.value"
        :icon="graph.annotation.isActive.value ? 'pencil' : 'pencil-outline'"
      />

      <GraphInfoMenu v-slot="{ toggle, isOpen }">
        <GToolbarButton
          @click="toggle"
          :active="isOpen"
          icon="information-outline"
        />
      </GraphInfoMenu>

      <CollaborativeSessionMenu v-slot="{ toggle, isOpen }">
        <GToolbarButton
          @click="toggle"
          :active="isOpen"
          icon="account-multiple"
        />
      </CollaborativeSessionMenu>

      <TreeShapeMenu
        v-slot="{ toggle, isOpen }"
        :controls="treeControls"
      >
        <GToolbarButton
          @click="toggle"
          :active="isOpen || treeControls.isActive.value"
          :icon="
            isOpen || treeControls.isActive.value ? 'forest' : 'forest-outline'
          "
        />
      </TreeShapeMenu>

      <!-- <TemplateMenu v-slot="{ toggle, isOpen }">
        <GToolbarButton
          @click="toggle"
          :active="isOpen"
          :icon="isOpen ? 'plus-box' : 'plus-box-outline'"
        />
      </TemplateMenu> -->
    </ToolbarButtonGroup>
  </GToolbar>
</template>
