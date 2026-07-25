<script setup lang="ts">
  import { cn } from '@core/components/cn';
  import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

  import { computed } from 'vue';

  import IconButton from '../../components/icon-button/IconButton.vue';
  import HStack from '../../components/layout/HStack.vue';
  import VStack from '../../components/layout/VStack.vue';
  import Well from '../../components/layout/Well.vue';
  import { useThemeToClasses } from '../../useThemeToClasses.ts';
  import { useCtrlKeys } from '../../utilities/useCtrlKeys.ts';
  import { useRunningSimulation } from '../useRunningSimulation.ts';
  import ExplainerText from './ExplainerText.vue';

  const { simulation, violation } = useRunningSimulation();

  const violationThemeClasses = useThemeToClasses({
    dark: 'bg-red-900 border-red-900',
    light: 'bg-red-400 border-red-400',
  });

  const violationClasses = computed(() =>
    violation.value ? violationThemeClasses.value : '',
  );

  const baseWellClasses = 'p-0 rounded-full';

  const wellClass = computed(() => cn(violationClasses.value, baseWellClasses));
  const size = 48;

  const iconButtonClasses = 'bg-transparent px-8 rounded-full';

  const percentageComplete = computed(() => {
    const totalFrames = simulation.value.frames.length;
    const playhead = simulation.value.playhead.position;
    return (playhead / (totalFrames - 1)) * 100;
  });

  useCtrlKeys()
    .add('left', () => {
      if (!simulation.value.playhead.isFirst())
        simulation.value.playhead.prev();
    })
    .add('right', () => {
      if (!simulation.value.playhead.isLast()) simulation.value.playhead.next();
    });
</script>

<template>
  <VStack class="items-center gap-5">
    <div>
      <ExplainerText />
    </div>

    <div class="w-90 h-4">
      <div class="absolute rounded-full">
        <div
          :class="
            cn(
              'absolute w-90 h-4 border-2 rounded-full border-gray-800 overflow-hidden',
              violationClasses,
            )
          "
        >
          <div
            :class="cn('h-4 bg-gray-800', violationClasses)"
            :style="{ width: `${percentageComplete}%` }"
          ></div>
        </div>
      </div>
    </div>

    <HStack>
      <Well :class="wellClass">
        <IconButton
          :path="mdiChevronLeft"
          :size="size"
          :class="iconButtonClasses"
          :disabled="simulation.playhead.isFirst()"
          @click="simulation.playhead.prev()"
          label=""
          aria-label="Previous"
        />
      </Well>
      <Well :class="wellClass">
        <IconButton
          :size="size"
          :class="iconButtonClasses"
          :disabled="simulation.playhead.isLast()"
          @click="simulation.playhead.next()"
          :path="mdiChevronRight"
          label=""
          aria-label="Next"
        />
      </Well>
    </HStack>
  </VStack>
</template>
