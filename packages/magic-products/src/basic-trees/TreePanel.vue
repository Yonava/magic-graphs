<script setup lang="ts">
  import { getRandomInRange } from '@core/utils/random';
  import ButtonVue from '@magic/shared/Button';
  import HStackVue from '@magic/shared/HStack';
  import WellVue from '@magic/shared/Well';

  import { ref } from 'vue';

  const getNodeValue = () => getRandomInRange(1, 99);

  const newNodeValue = ref(getNodeValue());

  const addNodeToAvl = () => {
    newNodeValue.value = getNodeValue();
  };
</script>

<template>
  <WellVue>
    <HStackVue>
      <ButtonVue @click="addNodeToAvl"> Add {{ newNodeValue }} </ButtonVue>
    </HStackVue>
  </WellVue>
</template>
