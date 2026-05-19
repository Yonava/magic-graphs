<script setup lang="ts">
  import OverlayBadge from 'primevue/overlaybadge';
</script>

<template>
  <OverlayBadge
    value="new"
    size="small"
    severity="warn"
  >
    <slot></slot>
  </OverlayBadge>
</template>
