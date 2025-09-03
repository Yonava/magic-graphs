<script setup lang="ts">
  import { nonNullGraph as graph } from "@magic/products/shared/globalGraph";
  import { useNonNullGraphColors } from "@magic/products/shared/useGlobalGraphColors";
  import { PRODUCT_SHORTCUTS } from "@magic/products/shared/shortcuts";
  import GText from "@magic/products/shared/ui/graph-core/GText.vue";
  import GButton from "@magic/products/shared/ui/graph-core/button/GButton.vue";
  import GSpreadSelect from "@magic/products/shared/ui/graph-core/select/GSpreadSelect.vue";
  import keys from "ctrl-keys";

  import { onUnmounted, ref, toRefs } from "vue";
  import type { UnwrapRef } from "vue";

  import PlaybackButton from "./PlaybackButton.vue";
  import ProgressBar from "./ProgressBar.vue";
  import type { SimulationControls } from "./types";

  const colors = useNonNullGraphColors();

  const props = defineProps<{
    controls: SimulationControls | UnwrapRef<SimulationControls>;
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

  const {
    nextStep,
    prevStep,
    setStep,
    start,
    stop,
    showPlaybackSpeedControls,
    pauseOnStructureChange,
    defaultPlaybackSpeedMs,
  } = props.controls;

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

  if (pauseOnStructureChange) {
    graph.value.subscribe("onStructureChange", pause);
  }

  onUnmounted(() => {
    graph.value.unsubscribe("onStructureChange", pause);
  });

  const PLAYBACK_SPEEDS = [
    {
      label: "0.25x",
      value: defaultPlaybackSpeedMs / 0.25,
    },
    {
      label: "0.5x",
      value: defaultPlaybackSpeedMs / 0.5,
    },
    {
      label: "1x",
      value: defaultPlaybackSpeedMs,
    },
    {
      label: "2x",
      value: defaultPlaybackSpeedMs / 2,
    },
    {
      label: "4x",
      value: defaultPlaybackSpeedMs / 4,
    },
  ] as const;

  const speedMenuOpen = ref(false);

  const initialItemIndex =
    PLAYBACK_SPEEDS.findIndex((speed) => speed.value === playbackSpeed.value) ??
    2;

  const ctrlKeys = keys();

  ctrlKeys.add(PRODUCT_SHORTCUTS["Pause/Play Simulation"].binding, () => {
    if (isOver.value) {
      restart();
    } else {
      togglePause();
    }
  });

  ctrlKeys.add(
    PRODUCT_SHORTCUTS["Simulation Step Backward"].binding,
    goPrevStep
  );

  ctrlKeys.add(
    PRODUCT_SHORTCUTS["Simulation Step Forward"].binding,
    goNextStep
  );

  window.addEventListener("keyup", ctrlKeys.handle);
  onUnmounted(() => window.removeEventListener("keyup", ctrlKeys.handle));
</script>

<template>
  <div class="relative flex flex-col gap-5 items-center justify-center">
    <GText
      v-if="explanationAtStep"
      class="absolute font-bold text-xl w-[800px] text-center -top-12 pointer-events-none"
    >
      {{ explanationAtStep }}
    </GText>

    <div class="flex w-full justify-center gap-2">
      <GSpreadSelect
        v-if="showPlaybackSpeedControls"
        v-model="playbackSpeed"
        v-model:open="speedMenuOpen"
        :items="PLAYBACK_SPEEDS"
        :initial-item-index="initialItemIndex"
      ></GSpreadSelect>

      <GButton
        v-if="!speedMenuOpen"
        class="rounded-full"
      >
        <span class="px-2">Step {{ step + 1 }}</span>
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
        :disabled="lastStep === 0"
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
