<script setup lang="ts">
  import { manifest } from '@magic/products/path-finding/manifest';

  useSeoMeta(manifest.meta);
</script>

<template>
  <div><component :is="manifest.component" /></div>
</template>
