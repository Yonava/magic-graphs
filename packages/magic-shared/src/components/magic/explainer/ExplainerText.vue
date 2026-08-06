<script setup lang="ts">
  import { cn } from '@core/components/cn';
  import { getValue } from '@core/utils/maybeGetter/index';

  import { computed } from 'vue';

  import { useProvidedGraph } from '../../../product/useProvidedGraph.ts';
  import { useThemeToClasses } from '../../../useThemeToClasses.ts';
  import Button from '../../button/Button.vue';
  import Tooltip from '../../tooltip/Tooltip.vue';
  import { explainerSegments } from './explainerSegments.ts';
  import { Explainer } from './types.ts';

  const parentClasses = useThemeToClasses({
    dark: 'text-white',
    light: 'text-black',
  });

  const graph = useProvidedGraph();

  const props = defineProps<{
    explainer?: Explainer;
  }>();

  const segments = computed(() => explainerSegments(graph, props.explainer));
</script>

<template>
  <div :class="cn(parentClasses, 'text-2xl font-bold text-center')">
    <template
      v-for="segment in segments"
      :key="segment.id"
    >
      <template v-if="segment.highlight">
        <Tooltip
          :label="getValue(segment.highlight.tooltipLabel, graph)"
          @vue:mounted="segment.highlight.onMounted?.(graph)"
          @vue:unmounted="segment.highlight.onUnmounted?.(graph)"
        >
          <template #trigger>
            <Button
              @mouseenter="segment.highlight.activate?.(graph)"
              @mouseleave="segment.highlight.deactivate?.(graph)"
              :class="
                cn(
                  'text-2xl font-bold px-2 py-0',
                  getValue(segment.highlight.classes, graph),
                )
              "
              :style="getValue(segment.highlight.styles, graph)"
              >{{ getValue(segment.text) }}</Button
            >
          </template>
        </Tooltip>
      </template>
      <template v-else>{{ getValue(segment.text) }}</template>
    </template>
  </div>
</template>
