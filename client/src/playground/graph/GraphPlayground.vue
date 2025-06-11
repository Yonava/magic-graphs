<script setup lang="ts">
  // import { ref, watch } from 'vue';
  // import { useLocalStorage } from '@vueuse/core';
  // import { useGraph } from '@graph/useGraph';
  // import { useBasicsTutorial } from '@graph/tutorials/useTutorial';
  // import TutorialControls from '@graph/tutorials/TutorialControls.vue';
  // import TutorialHint from '@graph/tutorials/TutorialHint.vue';
  // import { useGraphBtns } from '@graph/buttons/useGraphBtns';
  // import GraphBtns from '@graph/buttons/GraphBtns.vue';
  // import ThemeControls from './ThemeControls.vue';
  // import type { GraphPlaygroundControls as Controls } from './types';
  // import GraphPlaygroundControls from './GraphPlaygroundControls.vue';
  // import { isFraction } from '@utils/fracDecConverter';
  // import SettingsControls from './SettingsControls.vue';

  // const graphElement = ref<HTMLCanvasElement>();

  // const graph = useGraph(graphElement, {
  //   edgeInputToLabel: (str) => {
  //     if (isFraction(str)) return str;
  //     else if (!isNaN(Number(str))) return str;
  //   },
  // });

  // const tutorialControls = useBasicsTutorial(graph);

  // const { btnArr } = useGraphBtns(graph);

  // const controls = useLocalStorage<Controls>('graph-playground-controls', {
  //   tutorial: true,
  //   theme: true,
  //   settings: true,
  //   buttons: true,
  // });

  // watch(
  //   controls,
  //   () => {
  //     if (controls.value.tutorial) {
  //       tutorialControls.start();
  //     } else {
  //       tutorialControls.stop();
  //     }
  //   },
  //   { immediate: true, deep: true },
  // );
</script>

<template>
  <div class="relative w-full h-full">
    <!-- <div class="w-full h-full absolute">
      <Graph
        @graph-ref="(el) => (graphElement = el)"
        :graph="graph"
      />
    </div>

    <div
      v-if="controls.buttons"
      class="absolute flex gap-2 m-2 flex-wrap w-[85%]"
    >
      <GraphBtns :btns="btnArr" />
    </div>

    <div
      v-if="controls.tutorial"
      class="bottom-0 absolute flex gap-2 m-2"
    >
      <TutorialControls :tutorial="tutorialControls" />
    </div>

    <div
      v-if="controls.tutorial"
      class="absolute w-full dark:text-white bottom-[10%] grid place-items-center pointer-events-none"
    >
      <TutorialHint :tutorial="tutorialControls" />
    </div>

    <div class="absolute h-3/4 top-[100px] right-0">
      <div
        v-if="controls.theme"
        class="w-[325px] h-1/2 overflow-auto bg-gray-800 bg-opacity-80 rounded-l-xl mb-3"
      >
        <ThemeControls :graph="graph" />
      </div>

      <div
        v-if="controls.settings"
        class="w-[325px] h-1/2 overflow-auto bg-gray-800 bg-opacity-80 rounded-l-xl"
      >
        <SettingsControls :graph="graph" />
      </div>
    </div>

    <div
      class="absolute w-[150px] top-1/4 overflow-auto bg-gray-800 bg-opacity-80 rounded-r-xl"
    >
      <GraphPlaygroundControls :playground-controls="controls" />
    </div> -->
  </div>
</template>
