<script setup lang="ts">
  import GWell from '@ui/graph/GWell.vue';
  import GButton from '@ui/graph/button/GButton.vue';
  import gsap from 'gsap';

  import { ref } from 'vue';

  import type { TreeControls } from '../useTree';

  const props = defineProps<{
    tree: TreeControls;
  }>();

  const getNumbers = () => {
    const treeArr = props.tree.tree
      .toArray()
      .filter((num) => num !== undefined);

    if (treeArr.length === 0) return [1, 2, 3, 4, 5];
    const min = Math.min(...treeArr);
    const max = Math.max(...treeArr);
    const nums: number[] = [];
    for (let i = min - 10; i < max + 10; i++) nums.push(i);
    const validNums = nums.filter((num) =>
      treeArr.every((tNum) => num !== tNum),
    );
    return gsap.utils.shuffle(validNums).slice(0, 5);
  };

  const recommendedNodes = ref<number[]>([]);
  setTimeout(() => (recommendedNodes.value = getNumbers()), 5);
</script>

<template>
  <GWell class="p-2 rounded-xl">
    <div class="flex gap-2 flex-col">
      <GButton
        v-for="node in recommendedNodes"
        :key="node"
        @click="props.tree.insertNode(node)"
        secondary
        class="rounded-full w-10 h-10"
      >
        {{ node }}
      </GButton>
    </div>
  </GWell>
</template>
