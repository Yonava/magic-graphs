<script setup lang="ts">
  import colors from "@colors";
  import { nonNullGraph as graph } from "@magic/graph/global";
  import { useNonNullGraphColors } from "@magic/graph/themes/useGraphColors";
  import { useTransitionMatrix } from "@magic/graph/useTransitionMatrix";

  import { computed } from "vue";

  import TransitionMatrixLabel from "./TransitionMatrixLabel.vue";

  const { transitionMatrix } = useTransitionMatrix(graph.value);

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
</script>

<template>
  <div
    v-if="transitionMatrix.length !== 0"
    class="flex py-6 items-center"
  >
    <div class="text-xl font-bold px-5 text-nowrap">T =</div>
    <div
      :style="brackets"
      class="p-4 rounded"
    >
      <div
        v-for="(row, rowIndex) in transitionMatrix"
        :key="'row-' + rowIndex"
        class="flex"
      >
        <div
          v-for="(col, colIndex) in row"
          :key="'col-' + colIndex"
        >
          <TransitionMatrixLabel
            :to-node="nodes[rowIndex]"
            :from-node="nodes[colIndex]"
            :weight="col"
          />
        </div>
      </div>
    </div>
  </div>
</template>
