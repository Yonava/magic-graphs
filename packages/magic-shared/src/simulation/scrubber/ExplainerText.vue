<script setup lang="ts">
  import { cn } from '@core/components/cn';
  import { nullThrows } from '@core/utils/assert';

  import { computed } from 'vue';

  import Button from '../../components/button/Button.vue';
  import Tooltip from '../../components/tooltip/Tooltip.vue';
  import { useThemeToClasses } from '../../useThemeToClasses.ts';
  import type { ExplainerHighlight } from '../types.ts';
  import { useRunningSimulation } from '../useRunningSimulation.ts';

  type ExplainerSegment = {
    text: string;
    highlight: ExplainerHighlight | undefined;
  };

  const { explainer } = useRunningSimulation();

  const parentClasses = useThemeToClasses({
    dark: 'text-white',
    light: 'text-black',
  });

  const explainerSegments = computed<ExplainerSegment[]>(() => {
    if (!explainer.value) return [];

    const { content: text, highlights } = explainer.value;

    const parts: ExplainerSegment[] = [];
    let lastIndex = 0;
    let highlightIndex = 0;

    const bracketPattern = /\[([^\]]*)\]/g;
    const matches = text.matchAll(bracketPattern);

    for (const match of matches) {
      const index = match.index ?? 0;
      if (index > lastIndex) {
        parts.push({
          text: text.slice(lastIndex, index),
          highlight: undefined,
        });
      }
      parts.push({
        text: match[1],
        highlight: nullThrows(
          highlights[highlightIndex++],
          `explainer content has more [bracketed] segments than highlights (expected highlights[${highlightIndex}])`,
        ),
      });
      lastIndex = index + match[0].length;
    }
    if (lastIndex < text.length) {
      parts.push({
        text: text.slice(lastIndex),
        highlight: undefined,
      });
    }

    return parts;
  });
</script>

<template>
  <div
    v-if="explainer"
    :class="cn(parentClasses, 'text-2xl font-bold')"
  >
    <template
      v-for="(segment, i) in explainerSegments"
      :key="i"
    >
      <template v-if="segment.highlight">
        <Tooltip :label="segment.highlight.tooltipContent">
          <template #trigger>
            <Button
              @mouseenter="segment.highlight.activate"
              @mouseleave="segment.highlight.deactivate"
              :class="
                cn('text-2xl font-bold px-2 py-0', segment.highlight.classes)
              "
              >{{ segment.text }}</Button
            >
          </template>
        </Tooltip>
      </template>
      <template v-else>{{ segment.text }}</template>
    </template>
  </div>
</template>
