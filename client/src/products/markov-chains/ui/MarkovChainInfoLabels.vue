<script setup lang="ts">
  import { nonNullGraph as graph } from '@graph/global';
  import { useSCCColorizer } from '@product/sandbox/ui/GraphInfoMenu/useSCCColorizer';
  import GHoverInfoTop from '@ui/graph/GHoverInfoTop.vue';
  import GWell from '@ui/graph/GWell.vue';

  import definitions from '../markov/definitions';
  import type { MarkovChain } from '../markov/useMarkovChain';
  import { useIllegalStateColorizer } from './useIllegalStateColorizer';
  import { useLabelSteadyState } from './useLabelSteadyState';
  import { usePeriodicityLabels } from './usePeriodicityLabels';

  const props = defineProps<{
    markov: MarkovChain;
  }>();

  const { label: labelPeriods, unlabel: unlabelPeriods } = usePeriodicityLabels(
    graph.value,
    props.markov,
  );

  const { label: labelSteadyState, unlabel: unlabelSteadyState } =
    useLabelSteadyState(graph.value, props.markov);

  const { colorize: colorizeIllegalState, decolorize: decolorizeIllegalState } =
    useIllegalStateColorizer(graph.value, props.markov);

  const { colorize: colorizeCommClass, decolorize: decolorizeCommClass } =
    useSCCColorizer(graph.value, 'markov-communicating-class');
</script>

<template>
  <GWell
    secondary
    class="p-2 rounded-lg flex flex-wrap gap-2"
  >
    <GHoverInfoTop
      @mouseenter="colorizeIllegalState"
      @mouseleave="decolorizeIllegalState"
      :tooltip="definitions.valid"
    >
      Valid? {{ markov.illegalNodeIds.value.size === 0 ? 'Yes' : 'No' }}
    </GHoverInfoTop>

    <GHoverInfoTop
      @mouseenter="labelPeriods"
      @mouseleave="unlabelPeriods"
      :tooltip="definitions.periodic"
    >
      Periodic? {{ markov.isPeriodic.value ? 'Yes' : 'No' }}
    </GHoverInfoTop>

    <GHoverInfoTop :tooltip="definitions.absorbing">
      Absorbing? {{ markov.isChainAbsorbing.value ? 'Yes' : 'No' }}
    </GHoverInfoTop>

    <GHoverInfoTop :tooltip="definitions.irreducible">
      Irreducible? {{ markov.isIrreducible.value ? 'Yes' : 'No' }}
    </GHoverInfoTop>

    <GHoverInfoTop
      @mouseenter="colorizeCommClass"
      @mouseleave="decolorizeCommClass"
      :tooltip="definitions.communicatingClasses"
    >
      Communicating Classes:
      {{ markov.communicatingClasses.value.length }}
    </GHoverInfoTop>

    <GHoverInfoTop
      @mouseenter="labelSteadyState"
      @mouseleave="unlabelSteadyState"
      :tooltip="definitions.steadyState"
    >
      Steady State (Coming Soon)
    </GHoverInfoTop>
  </GWell>
</template>
