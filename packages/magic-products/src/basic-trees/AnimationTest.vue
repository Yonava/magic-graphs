<script setup lang="ts">
  import { getRandomInRange } from '@core/utils/random';
  import ButtonVue from '@magic/shared/Button';
  import HStackVue from '@magic/shared/HStack';
  import WellVue from '@magic/shared/Well';
  import { useProvidedGraph } from '@magic/shared/product';

  const graph = useProvidedGraph();

  const ID = '123';

  const POS = { x: 400, y: 400 };

  let toggle = true;

  const addNode = () => {
    graph.actions.addNode({
      id: ID,
      focus: false,
      position: POS,
      animate: true,
    });
  };

  const moveNode = () => {
    toggle = !toggle;

    const finalize = graph.animation.auto();
    graph.positions.set({ nodeId: ID, update: { x: toggle ? 400 : 600 } });
    finalize();
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
