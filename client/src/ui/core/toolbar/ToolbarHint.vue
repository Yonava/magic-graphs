<script setup lang="ts">
  import type { TutorialControls } from '@graph/tutorials/types';
  import TutorialHint from '@graph/tutorials/TutorialHint.vue';
  import colors from '@utils/colors';

  withDefaults(
    defineProps<{
      color?: string;
      tutorial: TutorialControls;
    }>(),
    {
      color: colors.WHITE + '75',
    },
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
