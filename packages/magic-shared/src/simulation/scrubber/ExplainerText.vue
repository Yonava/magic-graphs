<script setup lang="ts">
  import { nullThrows } from '@core/utils/assert';

  import { computed } from 'vue';

  import Button from '../../components/button/Button.vue';
  import Tooltip from '../../components/tooltip/Tooltip.vue';
  import { useThemeToClasses } from '../../useThemeToClasses.ts';
  import { useRunningSimulation } from '../useRunningSimulation.ts';

  const { explainer } = useRunningSimulation();

  const classes = useThemeToClasses({
    dark: 'text-white',
    light: 'text-black',
  });

  const explainerParts = computed(() => {
    const text = explainer.value?.content ?? '';
    const parts: { text: string; highlighted: boolean }[] = [];
    let lastIndex = 0;

    for (const match of text.matchAll(/\[([^\]]*)\]/g)) {
      const index = match.index ?? 0;
      if (index > lastIndex)
        parts.push({ text: text.slice(lastIndex, index), highlighted: false });
      parts.push({ text: match[1], highlighted: true });
      lastIndex = index + match[0].length;
    }
    if (lastIndex < text.length)
      parts.push({ text: text.slice(lastIndex), highlighted: false });

    return parts;
  });

  const data = (i: number) => {
    const map: Record<number, number> = {
      0: 0,
      1: 0,
      2: 1,
      3: 0,
    };
    return nullThrows(explainer.value?.data[map[i]], 'defined');
  };
</script>

<template>
  <div
    v-if="explainer"
    :class="`${classes} text-2xl font-bold`"
  >
    <template
      v-for="(part, i) in explainerParts"
      :key="i"
    >
      <template v-if="part.highlighted">
        <Tooltip :label="data(i).tooltipContent">
          <template #trigger>
            <Button
              @mouseenter="data(i).activate"
              @mouseleave="data(i).deactivate"
              class="bg-orange-500 text-2xl font-bold px-2 py-0"
              >{{ part.text }}</Button
            >
          </template>
        </Tooltip>
      </template>
      <template v-else>{{ part.text }}</template>
    </template>
  </div>
</template>
