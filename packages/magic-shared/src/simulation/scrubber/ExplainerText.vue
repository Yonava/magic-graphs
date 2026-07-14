<script setup lang="ts">
  import { cn } from '@core/components/cn';
  import { nullThrows } from '@core/utils/assert';

  import { computed } from 'vue';

  import Button from '../../components/button/Button.vue';
  import Tooltip from '../../components/tooltip/Tooltip.vue';
  import { useThemeToClasses } from '../../useThemeToClasses.ts';
  import { useRunningSimulation } from '../useRunningSimulation.ts';

  type Part = { text: string; highlighted: boolean };

  const { explainer } = useRunningSimulation();

  const classes = useThemeToClasses({
    dark: 'text-white',
    light: 'text-black',
  });

  const explainerParts = computed(() => {
    if (!explainer.value) return [];

    const text = explainer.value.content;

    const parts: Part[] = [];
    let lastIndex = 0;

    const squareBracketRegex = /\[([^\]]*)\]/g;
    const matches = text.matchAll(squareBracketRegex);

    for (const match of matches) {
      const index = match.index ?? 0;
      if (index > lastIndex) {
        parts.push({ text: text.slice(lastIndex, index), highlighted: false });
      }
      parts.push({ text: match[1], highlighted: true });
      lastIndex = index + match[0].length;
    }
    if (lastIndex < text.length) {
      parts.push({ text: text.slice(lastIndex), highlighted: false });
    }

    return parts;
  });

  const explainerPartsWithData = computed(() => {
    let i = 0;
    return explainerParts.value.map((e) => ({
      ...e,
      data: e.highlighted
        ? nullThrows(explainer.value?.data[i++], 'defined')
        : undefined,
    }));
  });
</script>

<template>
  <div
    v-if="explainer"
    :class="`${classes} text-2xl font-bold`"
  >
    <template
      v-for="(part, i) in explainerPartsWithData"
      :key="i"
    >
      <template v-if="part.highlighted">
        <Tooltip :label="part.data?.tooltipContent">
          <template #trigger>
            <Button
              @mouseenter="part.data?.activate"
              @mouseleave="part.data?.deactivate"
              :class="cn('text-2xl font-bold px-2 py-0', part.data?.classes)"
              >{{ part.text }}</Button
            >
          </template>
        </Tooltip>
      </template>
      <template v-else>{{ part.text }}</template>
    </template>
  </div>
</template>
