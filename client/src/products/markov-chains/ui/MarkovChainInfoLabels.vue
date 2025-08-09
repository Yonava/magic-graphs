<script setup lang="ts">
  import { nonNullGraph as graph } from '@graph/global';
  import { useNodeLabel } from '@graph/themes/helpers/useNodeLabel';
  import { useSCCColorizer } from '@product/sandbox/ui/GraphInfoMenu/useSCCColorizer';
  import GHoverInfoTop from '@ui/graph/GHoverInfoTop.vue';
  import GWell from '@ui/graph/GWell.vue';

  import { computed } from 'vue';

  import definitions from '../markov/definitions';
  import type { MarkovChain } from '../markov/useMarkovChain';
  import { useInvalidStateColorizer } from './useInvalidStateColorizer';
  import { usePeriodicityLabels } from './usePeriodicityLabels';

  const props = defineProps<{
    markov: MarkovChain;
  }>();

  const { label: labelPeriods, unlabel: unlabelPeriods } = usePeriodicityLabels(
    graph.value,
    props.markov,
  );

  const { colorize: colorizeIllegalState, decolorize: decolorizeIllegalState } =
    useInvalidStateColorizer(graph.value, props.markov);

  const { color: colorizeCommClass, uncolor: decolorizeCommClass } =
    useSCCColorizer(graph.value);

  const steadyState = computed(() => {
    const s = props.markov.uniqueSteadyState.value;
    if (s.type === 'error-invalid') return 'Chain Invalid';
    if (s.type === 'error-no-convergence') return 'Does Not Converge';
    if (s.type === 'error-not-unique') return 'Not Unique';
    return s.data.map((f) => f.toFraction());
  });

  const { label: labelSteadyState, unlabel: unlabelSteadyState } = useNodeLabel(
    graph.value,
    (nodeId) => {
      const index = graph.value.nodeIdToIndex.value.get(nodeId)!;
      const vector = steadyState.value;
      if (typeof vector !== 'string') return vector[index];
    },
    'unique-steady-state-text',
  );
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
      Valid? {{ markov.isChainValid.value ? 'Yes' : 'No' }}
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
      Steady State: {{ steadyState }}
    </GHoverInfoTop>
  </GWell>
</template>
