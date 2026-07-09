<script setup lang="ts"></script>

<template>
  <div class="h-[100vh]">
    <router-view />
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
