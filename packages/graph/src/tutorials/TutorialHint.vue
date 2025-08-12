<script setup lang="ts">
  import type { TutorialControls } from '@graph/tutorials/types';

  import { computed, ref, watch } from 'vue';

  import { DELAY_UNTIL_NEXT_STEP } from './types';

  const { tutorial } = defineProps<{
    tutorial: TutorialControls;
  }>();

  const opacity = ref(0);

  const hint = computed(
    () => tutorial.sequence.value[tutorial.step.value]?.hint ?? '',
  );
  const displayedHint = ref('');

  let activeTimeout: NodeJS.Timeout;

  const transitionDuration = 300;

  watch(
    hint,
    () => {
      opacity.value = 0;
      clearTimeout(activeTimeout);
      activeTimeout = setTimeout(() => {
        displayedHint.value = hint.value;
        opacity.value = 1;
      }, transitionDuration + DELAY_UNTIL_NEXT_STEP);
    },
    { immediate: true },
  );
</script>

<template>
  <div
    :class="[
      'transition-opacity',
      `duration-[${transitionDuration}ms]`,
      'select-none',
      'text-center',
    ]"
    :style="{
      opacity,
    }"
  >
    <slot :hint="displayedHint">
      <h1 class="text-3xl font-bold">
        {{ displayedHint }}
      </h1>
    </slot>
  </div>
</template>
