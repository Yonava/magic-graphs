<template>
  <div class="w-[100vw] h-[100vh]">
    <router-view />
    <Toast />
  </div>
</template>

<script setup lang="ts">
  import Toast from 'primevue/toast';
</script>
