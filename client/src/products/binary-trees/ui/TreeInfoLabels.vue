<script setup lang="ts">
  import { nonNullGraph as graph } from '@graph/global';
  import GHoverInfoTop from '@ui/graph/GHoverInfoTop.vue';
  import GWell from '@ui/graph/GWell.vue';

  import type { TreeControls } from '../useTree';
  import { useBalanceFactorLabels } from './useBalanceFactorLabels';
  import { useHeightLabels } from './useHeightLabels';

  const props = defineProps<{
    tree: TreeControls;
  }>();

  const { activate: labelBalance, deactivate: unlabelBalance } =
    useBalanceFactorLabels(graph.value, props.tree);

  const { activate: labelHeight, deactivate: unlabelHeight } = useHeightLabels(
    graph.value,
    props.tree,
  );

  const definitions = {
    balanceFactor:
      'The balance factor of a node is the height of its right subtree minus the height of its left subtree.',
    height:
      'The height of a node is the number of edges on the longest path from the node to a leaf.',
  };
</script>

<template>
  <GWell
    secondary
    class="p-2 rounded-lg flex flex-wrap gap-2"
  >
    <GHoverInfoTop
      @mouseenter="labelBalance"
      @mouseleave="unlabelBalance"
      :tooltip="definitions.balanceFactor"
    >
      Balance Factor
    </GHoverInfoTop>

    <GHoverInfoTop
      @mouseenter="labelHeight"
      @mouseleave="unlabelHeight"
      :tooltip="definitions.height"
    >
      Height
    </GHoverInfoTop>
  </GWell>
</template>
