<script setup lang="ts">
  import { getRandomInRange } from '@core/utils/random';
  import ButtonVue from '@magic/shared/Button';
  import HStackVue from '@magic/shared/HStack';
  import WellVue from '@magic/shared/Well';
  import { useProvidedGraph } from '@magic/shared/product';

  const graph = useProvidedGraph();

  const ID = '123';

  const POS = { x: 800, y: 400 };

  const addNode = () => {
    graph.actions.addNode({ id: ID, focus: false, position: POS });
  };

  const moveNode = () => {
    const randomX = getRandomInRange(POS.x - 400, POS.x + 400);
    const randomY = getRandomInRange(POS.y - 400, POS.y + 400);
    graph.positions.set({ nodeId: ID, update: { x: randomX, y: randomY } });
  };
</script>

<template>
  <WellVue>
    <HStackVue>
      <ButtonVue @click="addNode"> Add Node </ButtonVue>
      <ButtonVue @click="moveNode"> Move Node </ButtonVue>
    </HStackVue>
  </WellVue>
</template>
