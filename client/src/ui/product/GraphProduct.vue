<script setup lang="ts">
  import { computed, onMounted, onUnmounted, ref } from 'vue';
  import type { UnwrapRef } from 'vue';
  import { useGraphProduct } from '@graph/useGraphProduct';
  import SimulationPlaybackControls from '@ui/product/sim/SimulationPlaybackControls.vue';
  import AnnotationToolbar from '@product/sandbox/ui/AnnotationToolbar.vue';
  import ProductDropdown from '@ui/product/dropdown/ProductDropdown.vue';
  import SelectSimulation from '@ui/product/sim/SelectSim.vue';
  import type { SimulationDeclaration } from 'src/types';
  import { getSimulationDeclarationsForProduct } from '@utils/product';
  import StopSimButton from './StopSimButton.vue';
  import FullscreenButton from './FullscreenButton.vue';
  import ThemeToolbar from './ThemeToolbar.vue';
  import ZoomToolbar from './ZoomToolbar.vue';
  import HelpMenu from './HelpMenu.vue';
  import BenchmarkingMetrics from './dev/BenchmarkingMetrics.vue';
  import { inDevMode } from '@graph/global';
  import MagicCanvas from '@canvas/MagicCanvas.vue';
  import type { GraphWithCanvas } from '@product/shared/useGraphWithCanvas';
  import ShareButton from './ShareButton.vue';
  import GraphAtMousePositionData from './dev/GraphAtMousePositionData.vue';

  const props = defineProps<GraphWithCanvas>();

  const wasAnnotationActive = ref(false);

  const emit = defineEmits<{
    (e: 'simulation-started', value: UnwrapRef<SimulationDeclaration>): void;
    (e: 'simulation-stopped'): void;
  }>();

  const simulations = getSimulationDeclarationsForProduct(props.graph);

  const activeSimulation = ref(simulations[0]);
  const runningSimulation = ref(false);

  const simRunner = computed(() => activeSimulation.value.runner);
  const isActive = computed(() => simRunner.value.simControls.isActive);

  const startSimulation = async () => {
    runningSimulation.value = true;
    emit('simulation-started', activeSimulation.value);
    await simRunner.value.start();
  };

  const stopSimulation = async () => {
    await simRunner.value.stop();
    runningSimulation.value = false;
    emit('simulation-stopped');

    if (wasAnnotationActive.value) props.graph.annotation.activate();
    wasAnnotationActive.value = false;
  };

  const setActiveSimulation = (simulation: SimulationDeclaration) => {
    wasAnnotationActive.value = props.graph.annotation.isActive.value;
    props.graph.annotation.deactivate();

    activeSimulation.value = simulation;
    startSimulation();
  };

  useGraphProduct(props.graph);

  const graphDragging = ref(false);

  const pointerEvents = computed(() =>
    graphDragging.value ? 'pointer-events-none' : '',
  );

  const startGraphDrag = () => (graphDragging.value = true);
  const stopGraphDrag = () => (graphDragging.value = false);

  onMounted(() => {
    props.graph.subscribe('onMouseDown', startGraphDrag);
    props.graph.subscribe('onMouseUp', stopGraphDrag);
  });

  onUnmounted(() => {
    props.graph.unsubscribe('onMouseDown', startGraphDrag);
    props.graph.unsubscribe('onMouseUp', stopGraphDrag);
  });
</script>

<template>
  <div :class="[pointerEvents]">
    <div :class="['absolute', 'top-6', 'left-6']">
      <ProductDropdown />
    </div>

    <div
      :class="[
        'absolute',
        'flex',
        'flex-col',
        'justify-center',
        'items-center',
        'gap-2',
        'left-1/2',
        '-translate-x-1/2',
        'translate-y-6',
      ]"
    >
      <template v-if="runningSimulation">
        <slot name="top-center-sim"></slot>
      </template>

      <template v-else>
        <slot name="top-center"></slot>
      </template>
    </div>

    <div :class="['absolute', 'top-6', 'right-6']">
      <template v-if="runningSimulation">
        <slot name="top-right-sim">
          <StopSimButton @click="stopSimulation" />
        </slot>
      </template>

      <template v-else>
        <slot name="top-right">
          <SelectSimulation
            v-if="simulations.length > 0"
            @simulation-selected="setActiveSimulation"
            :simulations="simulations"
          />
        </slot>
      </template>
    </div>

    <div
      :class="[
        'absolute',
        'grid',
        'place-items-center',
        'left-6',
        'max-w-96',
        '-translate-y-1/2',
        'top-1/2',
      ]"
    >
      <div
        class="relative max-h-3/4 w-full grid place-items-center overflow-auto"
      >
        <template v-if="runningSimulation">
          <slot name="center-left-sim"></slot>
        </template>

        <template v-else>
          <slot name="center-left"></slot>
        </template>
      </div>
    </div>

    <div
      :class="[
        'absolute',
        'grid',
        'place-items-center',
        'right-6',
        'max-w-96',
        '-translate-y-1/2',
        'top-1/2',
      ]"
    >
      <div
        class="relative max-h-3/4 w-full grid place-items-center overflow-auto"
      >
        <template v-if="runningSimulation">
          <slot name="center-right-sim"></slot>
        </template>

        <template v-else>
          <slot name="center-right"></slot>
        </template>
      </div>
    </div>

    <div :class="['absolute', 'flex', 'gap-2', 'bottom-6', 'left-6']">
      <HelpMenu />
      <ShareButton />
      <ZoomToolbar :camera="canvas.camera" />
    </div>

    <div :class="['absolute', 'bottom-6', '-translate-x-1/2', 'left-1/2']">
      <template v-if="runningSimulation && isActive">
        <slot name="bottom-center-sim">
          <SimulationPlaybackControls :controls="simRunner.simControls" />
        </slot>
      </template>

      <template v-else>
        <slot name="bottom-center">
          <div v-show="graph.annotation.isActive.value">
            <AnnotationToolbar />
          </div>
        </slot>
      </template>
    </div>

    <div
      v-if="inDevMode"
      :class="[
        'absolute',
        'flex',
        'flex-col',
        'gap-2',
        'bottom-20',
        'right-6',
        'pointer-events-none',
      ]"
    >
      <GraphAtMousePositionData />
      <BenchmarkingMetrics />
    </div>

    <div
      :class="['absolute', 'flex', 'flex-col', 'gap-2', 'bottom-6', 'right-6']"
    >
      <div :class="['flex', 'gap-2']">
        <ThemeToolbar />
        <FullscreenButton />
      </div>
    </div>
  </div>

  <MagicCanvas v-bind="{ ...props.canvas.ref, ...props.css.value }" />
</template>
