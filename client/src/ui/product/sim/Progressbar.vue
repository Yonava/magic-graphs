<script setup lang="ts">
  import { computed } from 'vue';
  import { PROGRESS_DEFAULTS } from './progressTypes';
  import type { ProgressBarOptions } from './progressTypes';
  import { useNonNullGraphColors } from '@graph/themes/useGraphColors';

  const colors = useNonNullGraphColors();

  const props = withDefaults(
    defineProps<ProgressBarOptions>(),
    PROGRESS_DEFAULTS,
  );

  const range = computed(() => {
    const [start, end] = props.range;
    return end - start;
  });

  const progressPercentage = (progressStep: number) => {
    // divide by 0 edge case
    if (range.value === 0) return 100;

    const [start] = props.range;
    const curr = progressStep;

    const progress = Math.min(Math.max(curr - start, 0), range.value);
    return (progress / range.value) * 100;
  };

  const getStepFromMouseEvent = (event: MouseEvent) => {
    const progressBar = event.currentTarget;
    if (!(progressBar instanceof HTMLElement))
      throw new Error('Invalid target');

    const clickPosition = event.offsetX;
    const progressBarWidth = progressBar.offsetWidth;

    const clickPercentage = clickPosition / progressBarWidth;
    const newProgress = props.range[0] + clickPercentage * range.value;

    return Math.round(newProgress);
  };

  const handleClick = (event: MouseEvent) => {
    const step = getStepFromMouseEvent(event);
    props.onProgressSet?.(step);
  };

  const handleMouseOver = (event: MouseEvent) => {
    const step = getStepFromMouseEvent(event);
    props.onHover?.(step);
  };
</script>

<template>
  <div
    @mousemove="handleMouseOver"
    @click="handleClick"
    class="relative overflow-hidden h-4 w-full z-1 cursor-pointer"
  >
    <div
      :class="`absolute top-0 left-0 h-full z-0`"
      :style="{
        backgroundColor: props.color ?? colors.tertiary,
        width: `${progressPercentage(progress)}%`,
        transition: `width ${props.transitionTimeMs}ms ${props.transitionEasing}`,
      }"
    ></div>
    <div
      :class="`absolute top-0 left-0 h-full z-10`"
      :style="{
        backgroundColor: colors.primary + '90',
        width: `${progressPercentage(previewProgress ?? props.range[0])}%`,
      }"
    ></div>
  </div>
</template>
