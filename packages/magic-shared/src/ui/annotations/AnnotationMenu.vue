<script setup lang="ts">
  import { mdiPencil } from '@mdi/js';

  import IconButton from '../../components/icon-button/IconButton.vue';
  import HStack from '../../components/layout/HStack.vue';
  import Well from '../../components/layout/Well.vue';
</script>

<template>
  <Well>
    <HStack>
      <IconButton :path="mdiPencil" />
    </HStack>
  </Well>
</template>
