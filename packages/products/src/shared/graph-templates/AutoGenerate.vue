<script setup lang="ts">
  import { nonNullGraph as graph } from "@magic/graph/global";
  import CIcon from "@magic/ui/core/Icon.vue";
  import GButton from "@magic/ui/graph/button/GButton.vue";

  import AutoGenerateSettingsMenu from "./AutoGenerateSettingsMenu.vue";
  import { useAutoGenerate } from "./useAutoGenerate";

  const { generate, options } = useAutoGenerate(graph.value);
</script>

<template>
  <div class="flex justify-between gap-2">
    <GButton
      @click="generate"
      class="flex-grow"
    >
      <CIcon icon="plus"></CIcon>
      Generate New
    </GButton>
    <AutoGenerateSettingsMenu :options="options" />
  </div>
</template>
