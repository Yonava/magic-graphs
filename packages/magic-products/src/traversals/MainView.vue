<script setup lang="ts">
  import HStack from '@core/components/HStack';
  import GraphProduct from '@magic/shared/product/GraphProduct.vue';
  import { useGraphProduct } from '@magic/shared/product/useGraphProduct';
  import Button from '@magic/ui/Button';
  import Well from '@magic/ui/Well';

  const graph = useGraphProduct();

  const toggleTheme = () => {
    const preset = graph.activePreset.value;
    graph.activePreset.value = preset === 'dark' ? 'light' : 'dark';
  };
</script>

<template>
  <GraphProduct>
    <Well>
      <HStack>
        <Button> Hello </Button>
        <Button @click="toggleTheme"> Change Theme </Button>
      </HStack>
    </Well>
  </GraphProduct>
</template>
