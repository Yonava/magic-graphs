<script setup lang="ts">
  import TutorialHint from "@magic/graph/tutorials/TutorialHint.vue";
  import type { TutorialControls } from "@magic/graph/tutorials/types";
  import colors from "@magic/utils/colors";

  withDefaults(
    defineProps<{
      color?: string;
      tutorial: TutorialControls;
    }>(),
    {
      color: colors.WHITE + "75",
    }
  );
</script>

<template>
  <TutorialHint
    :tutorial="tutorial"
    v-slot="{ hint }"
  >
    <h5
      :style="{ color }"
      class="text-sm"
    >
      {{ hint }}
    </h5>
  </TutorialHint>
</template>
