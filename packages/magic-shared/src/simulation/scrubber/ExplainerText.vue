<script setup lang="ts">
  import { cn } from '@core/components/cn';
  import { getValue } from '@core/utils/maybeGetter/index';

  import { computed } from 'vue';

  import Button from '../../components/button/Button.vue';
  import Tooltip from '../../components/tooltip/Tooltip.vue';
  import { useThemeToClasses } from '../../useThemeToClasses.ts';
  import { useRunningSimulation } from '../useRunningSimulation.ts';
  import { explainerSegments } from './explainerSegments.ts';

  const { explainer } = useRunningSimulation();

  const parentClasses = useThemeToClasses({
    dark: 'text-white',
    light: 'text-black',
  });

  const segments = computed(() => explainerSegments(explainer.value));
</script>

<template>
  <div
    v-if="explainer"
    :class="cn(parentClasses, 'text-2xl font-bold text-center')"
  >
    <template
      v-for="(segment, i) in segments"
      :key="i"
    >
      <template v-if="segment.highlight">
        <Tooltip :label="getValue(segment.highlight.tooltipLabel)">
          <template #trigger>
            <Button
              @mouseenter="segment.highlight.activate"
              @mouseleave="segment.highlight.deactivate"
              :class="
                cn(
                  'text-2xl font-bold px-2 py-0',
                  getValue(segment.highlight.classes),
                )
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
