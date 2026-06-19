<script setup lang="ts">
  import colors from '@magic/utils/colors';

  import { computed } from 'vue';

  import { nonNullGraph as graph } from '../../../shared/globalGraph.ts';
  import { useNonNullGraphColors } from '../../../shared/useGlobalGraphColors.ts';
  import TransitionMatrixLabel from './TransitionMatrixLabel.vue';

  const graphColors = useNonNullGraphColors();

  const brackets = {
    background: `
      linear-gradient(
        ${graphColors.value.secondary},
        ${graphColors.value.secondary}
      )
      50%
      50%/calc(100% - 10px)
      calc(100% - 10px) no-repeat,
      linear-gradient(
        90deg,
        ${graphColors.value.text}
        10%,
        ${colors.TRANSPARENT}
        10%,
        ${colors.TRANSPARENT}
        90%,
        ${graphColors.value.text}
        90%
      )
      188%
      0`,
  };

  const nodes = computed(() => graph.value.nodes.value);
  console.log(graph.value.transitionMatrix.value);
</script>

<template>
  <div
    v-if="graph.transitionMatrix.value.length !== 0"
    class="flex py-6 items-center"
  >
    <div class="text-xl font-bold px-5 text-nowrap">T =</div>
    <div
      :style="brackets"
      class="p-4 rounded"
    >
      <div
        v-for="(row, rowIndex) in graph.transitionMatrix.value"
        :key="'row-' + rowIndex"
        class="flex"
      >
        <div
          v-for="(col, colIndex) in row"
          :key="'col-' + colIndex"
        >
          <TransitionMatrixLabel
            :target-node="nodes[rowIndex]"
            :source-node="nodes[colIndex]"
            :weight="col.toString()"
          />
        </div>
      </div>
    </div>
  </div>
</template>
