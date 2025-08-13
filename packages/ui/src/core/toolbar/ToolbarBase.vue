<script setup lang="ts">
  import type { TutorialControls } from "@magic/graph/tutorials/types";
  import colors from "@magic/utils/colors";

  import ToolbarHint from "./ToolbarHint.vue";

  withDefaults(
    defineProps<{
      color?: string;
      hint?: TutorialControls;
    }>(),
    {
      color: colors.GRAY_800,
      hint: undefined,
    }
  );
</script>

<template>
  <div class="flex flex-col gap-2">
    <div
      :style="{ backgroundColor: color }"
      class="flex items-center gap-2 py-1 px-1 rounded-lg"
    >
      <slot></slot>
    </div>
    <slot name="hint">
      <ToolbarHint
        v-if="hint"
        :tutorial="hint"
      />
    </slot>
  </div>
</template>
