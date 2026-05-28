<script setup lang="ts">
  import Toast from 'primevue/toast';
</script>

<template>
  <div class="h-[100vh]">
    <router-view />
    <Toast />
  </div>
</template>

<style>
  html,
  body {
    overscroll-behavior-x: none;
  }

  /* hide the bars that show up when you scroll */
  ::-webkit-scrollbar {
    display: none;
  }
</style>
