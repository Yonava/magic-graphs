<script setup lang="ts">
  import { useNonNullGraphColors } from "@magic/products/shared/useGlobalGraphColors";
  import type { TutorialControls } from "@magic/graph/tutorials/types";
  import CToolbar from "../../core/toolbar/ToolbarBase.vue";

  import GToolbarHint from "./GToolbarHint.vue";

  const colors = useNonNullGraphColors();

  defineProps<{
    hint?: TutorialControls;
  }>();
</script>

<template>
  <CToolbar
    :hint="hint"
    :color="colors.primary"
  >
    <slot></slot>
    <template #hint>
      <div class="absolute w-full translate-y-14 pointer-events-none">
        <GToolbarHint
          v-if="hint"
          :tutorial="hint"
        />
      </div>
    </template>
  </CToolbar>
</template>
