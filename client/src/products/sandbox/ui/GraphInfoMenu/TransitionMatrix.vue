<script setup lang="ts">
  import { ref } from 'vue';
  import { nonNullGraph as graph } from '@graph/global';
  import TransitionMatrixDisplay from './TransitionMatrixDisplay.vue';
  import GWell from '@ui/graph/GWell.vue';
  import GButton from '@ui/graph/button/GButton.vue';

  /**
   * if the transition matrix is too large, we incur a significant performance
   * hit when rendering it. To mitigate this, we only load the
   * transition matrix after the user has been prompted to do so.
   */
  const loadOnlyAfterPrompt = ref(graph.value.nodes.value.length > 10);
</script>

<template>
  <div class="flex items-end justify-between">
    <h2 class="text-xl font-bold mb-2 mt-5">Transition Matrix</h2>
  </div>
  <GWell
    secondary
    class="p-3 rounded-lg max-h-[300px] overflow-auto"
  >
    <div v-if="loadOnlyAfterPrompt">
      <GButton @click="loadOnlyAfterPrompt = false">
        Load Transition Matrix
      </GButton>
    </div>
    <div v-else>
      <TransitionMatrixDisplay />
    </div>
  </GWell>
</template>
