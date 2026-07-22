<script setup lang="ts">
  import { cn } from '@core/components/cn';
  import { getValue } from '@core/utils/maybeGetter/index';

  import { computed } from 'vue';

  import Button from '../../components/button/Button.vue';
  import Tooltip from '../../components/tooltip/Tooltip.vue';
  import { useProvidedGraph } from '../../product/useProvidedGraph.ts';
  import { useThemeToClasses } from '../../useThemeToClasses.ts';
  import { useRunningSimulation } from '../useRunningSimulation.ts';
  import { explainerSegments } from './explainerSegments.ts';

  const { explainer, violation } = useRunningSimulation();

  const parentClasses = useThemeToClasses({
    dark: 'text-white',
    light: 'text-black',
  });

  const graph = useProvidedGraph();

  const segments = computed(() =>
    explainerSegments(graph, violation.value?.explainer ?? explainer.value),
  );
</script>

<template>
  <div
    v-if="segments"
    :class="cn(parentClasses, 'text-2xl font-bold text-center')"
  >
    <template
      v-for="segment in segments"
      :key="segment.id"
    >
      <template v-if="segment.highlight">
        <Tooltip
          :label="getValue(segment.highlight.tooltipLabel)"
          @vue:mounted="segment.highlight.onMounted?.()"
          @vue:unmounted="segment.highlight.onUnmounted?.()"
        >
          <template #trigger>
            <Button
              @mouseenter="segment.highlight.activate?.()"
              @mouseleave="segment.highlight.deactivate?.()"
              :class="
                cn(
                  'text-2xl font-bold px-2 py-0',
                  getValue(segment.highlight.classes),
                )
              "
              :style="getValue(segment.highlight.styles)"
              >{{ getValue(segment.text) }}</Button
            >
          </template>
        </Tooltip>
      </template>
      <template v-else>{{ getValue(segment.text) }}</template>
    </template>
  </div>
</template>
