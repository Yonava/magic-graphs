<script setup lang="ts">
  import { onUnmounted, ref, toRefs } from 'vue';
  import type { UnwrapRef } from 'vue';
  import { nonNullGraph as graph } from '@graph/global';
  import type { SimulationControls } from './types';
  import PlaybackButton from './PlaybackButton.vue';
  import ProgressBar from './ProgressBar.vue';
  import { useNonNullGraphColors } from '@graph/themes/useGraphColors';
  import GSpreadSelect from '@ui/graph/select/GSpreadSelect.vue';
  import GButton from '@ui/graph/button/GButton.vue';
  import { DEFAULT_PLAYBACK_SPEED } from './useSimulationControls';
  import keys from 'ctrl-keys';
  import { PRODUCT_SHORTCUTS } from '@product/shared/shortcuts';

  const colors = useNonNullGraphColors();

  const props = defineProps<{
    controls: UnwrapRef<SimulationControls>;
  }>();

  const {
    isOver,
    paused,
    step,
    hasBegun,
    lastStep,
    playbackSpeed,
    explanationAtStep,
  } = toRefs(props.controls);

  const { nextStep, prevStep, setStep, start, stop } = props.controls;

  const goPrevStep = () => {
    prevStep();
    paused.value = true;
  };

  const goNextStep = () => {
    nextStep();
    paused.value = true;
  };

  const goToStep = (step: number) => {
    setStep(step);
    paused.value = true;
  };

  const togglePause = () => {
    paused.value = !paused.value;
  };

  const restart = () => {
    stop();
    start();
  };

  const previewedProgress = ref(-1);

  const onProgressBarHover = (prog: number) => {
    previewedProgress.value = prog;
  };

  const onProgressMouseLeave = () => {
    previewedProgress.value = -1;
  };

  const pause = () => {
    paused.value = true;
  };

  graph.value.subscribe('onStructureChange', pause);

  onUnmounted(() => {
    graph.value.unsubscribe('onStructureChange', pause);
  });

  const PLAYBACK_SPEEDS = [
    {
      label: '0.25x',
      value: DEFAULT_PLAYBACK_SPEED / 0.25,
    },
    {
      label: '0.5x',
      value: DEFAULT_PLAYBACK_SPEED / 0.5,
    },
    {
      label: '1x',
      value: DEFAULT_PLAYBACK_SPEED,
    },
    {
      label: '2x',
      value: DEFAULT_PLAYBACK_SPEED / 2,
    },
    {
      label: '4x',
      value: DEFAULT_PLAYBACK_SPEED / 4,
    },
  ] as const;

  const speedMenuOpen = ref(false);

  const initialItemIndex =
    PLAYBACK_SPEEDS.findIndex((speed) => speed.value === playbackSpeed.value) ??
    2;

  const ctrlKeys = keys();

  ctrlKeys.add(PRODUCT_SHORTCUTS['Pause/Play Simulation'].binding, () => {
    if (isOver.value) {
      restart();
    } else {
      togglePause();
    }
  });

  ctrlKeys.add(
    PRODUCT_SHORTCUTS['Simulation Step Backward'].binding,
    goPrevStep,
  );

  ctrlKeys.add(
    PRODUCT_SHORTCUTS['Simulation Step Forward'].binding,
    goNextStep,
  );

  window.addEventListener('keyup', ctrlKeys.handle);
  onUnmounted(() => window.removeEventListener('keyup', ctrlKeys.handle));
</script>

<template>
  <div class="flex flex-col gap-5 items-center justify-center">
    <div v-if="explanationAtStep">
      <h1 class="mb-2 font-bold text-2xl">
        {{ explanationAtStep }}
      </h1>
    </div>

    <div class="flex gap-2 justify-between">
      <GSpreadSelect
        v-model="playbackSpeed"
        v-model:open="speedMenuOpen"
        :items="PLAYBACK_SPEEDS"
        :initial-item-index="initialItemIndex"
      ></GSpreadSelect>

      <GButton
        v-if="!speedMenuOpen"
        class="rounded-full"
      >
        <span class="w-12">
          {{ step }}
        </span>
      </GButton>
    </div>

    <ProgressBar
      v-if="lastStep !== Infinity"
      @mouseleave="onProgressMouseLeave"
      :range="[0, lastStep]"
      :progress="step"
      :on-progress-set="goToStep"
      :preview-progress="previewedProgress"
      :on-hover="onProgressBarHover"
      :style="{ borderColor: colors.tertiary }"
      class="w-full border-2 rounded-lg"
    />

    <div class="flex gap-4 fill-white dark:fill-black">
      <PlaybackButton
        @click="goPrevStep"
        :disabled="!hasBegun"
        icon="chevron-left"
      />

      <PlaybackButton
        v-if="isOver"
        @click="restart"
        icon="restart"
      />

      <PlaybackButton
        v-else
        @click="togglePause"
        :icon="paused ? 'play' : 'pause'"
      />

      <PlaybackButton
        @click="goNextStep"
        :disabled="isOver"
        icon="chevron-right"
      />
    </div>
  </div>
</template>
