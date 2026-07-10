<script setup lang="ts">
  import GraphProduct from '@magic/shared/product/GraphProduct.vue';
  import { useGraphProduct } from '@magic/shared/product/useGraphProduct';
  import Button from '@magic/ui/Button';
  import HStack from '@magic/ui/HStack';
  import ToggleButton from '@magic/ui/ToggleButton';
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
        <ToggleButton>Hello</ToggleButton>
        <Button @click="toggleTheme"> Change Theme </Button>
      </HStack>
    </Well>
  </GraphProduct>
</template>
