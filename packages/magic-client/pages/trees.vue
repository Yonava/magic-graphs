<script setup lang="ts">
  import { manifest } from '@magic/products/basic-trees/manifest';

  useSeoMeta(manifest.meta);
</script>

<template>
  <div><component :is="manifest.component" /></div>
</template>
