<script setup lang="ts">
  import { nonNullGraph as graph } from '@graph/global';
  import GWell from '@ui/graph/GWell.vue';
  import GButton from '@ui/graph/button/GButton.vue';

  import type { TreeControls } from '../useTree';

  const props = defineProps<{
    tree: TreeControls;
  }>();
</script>

<template>
  <GWell
    secondary
    class="rounded-lg flex gap-2 p-2"
  >
    <GButton
      @click="tree.balanceTree"
      :disabled="props.tree.isBalanced.value"
      tertiary
    >
      Balance Tree
    </GButton>
    <GButton
      @click="tree.resetTree"
      :disabled="graph.nodes.value.length === 0"
      tertiary
    >
      Reset Tree
    </GButton>
  </GWell>
</template>
