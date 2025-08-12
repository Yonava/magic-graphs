<script setup lang="ts">
  import { nonNullGraph as graph } from '@graph/global';
  import CPopover from '@ui/core/Popover.vue';
  import GWell from '@ui/graph/GWell.vue';
  import GButton from '@ui/graph/button/GButton.vue';

  import { computed } from 'vue';

  import AutoGenerate from '../autoGenerate/AutoGenerate.vue';
  import { useGraphTemplate } from '../useGraphTemplate';
  import TemplateItem from './TemplateItem.vue';

  const {
    templates,
    userTemplates,
    add,
    load,
    clearUserTemplates,
    removeUserTemplate,
  } = useGraphTemplate(graph.value);

  const color = computed(() => graph.value.baseTheme.value.graphBgColor);
</script>

<template>
  <CPopover>
    <template #activator="props">
      <slot v-bind="props"></slot>
    </template>
    <GWell
      class="flex flex-col text-xl font-bold p-3 w-[400px] max-h-[500px] rounded-lg gap-2"
    >
      <h1 class="text-2xl">Templates</h1>
      <AutoGenerate />
      <hr class="my-2" />
      <p
        v-if="templates.length === 0"
        class="font-normal text-base text-center"
      >
        Add a template!
      </p>
      <div
        v-else
        class="max-h-[600px] overflow-auto"
      >
        <div
          v-for="template in templates"
          :key="template.id"
          class="flex flex-col gap-2 mb-2"
        >
          <TemplateItem
            :template="template"
            :load="load"
            :remove="removeUserTemplate"
            class="w-full rounded"
            :style="{
              backgroundColor: color,
            }"
          />
        </div>
      </div>

      <div class="flex gap-2 justify-center">
        <GButton
          @click="add"
          :disabled="graph.nodes.value.length === 0"
          >Save Current</GButton
        >
        <GButton
          @click="clearUserTemplates"
          :disabled="userTemplates.length === 0"
          >Clear All</GButton
        >
      </div>
    </GWell>
  </CPopover>
</template>
