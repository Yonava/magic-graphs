<template>
  <div class="w-[100vw] h-[100vh]">
    <router-view />
    <Toast />
  </div>
</template>

<script setup lang="ts">
  import Toast from 'primevue/toast';
</script>

<style>
  /* hide the bars that show up when you scroll */
  ::-webkit-scrollbar {
    display: none;
  }

  /* * {
  user-select: none;
} */

  html,
  body {
    overscroll-behavior-x: none;
  }

  /* TODO - we might want to adjust the selection color */
  ::selection {
    background-color: rgb(red, green, blue);
  }

  /* class for exclusive use by useGraphTutorial, should be move out to css file at some point */
  .element-highlight {
    animation: highlight 1s infinite;
  }

  @keyframes highlight {
    0% {
      background-color: #f6ad55;
      scale: 1;
      transform: translate(0, 0);
      box-shadow: none;
    }
    50% {
      background-color: #ed8936;
      scale: 1.15;
      box-shadow: 0px 0px 50px 15px #ed893650;
    }
    100% {
      background-color: #f6ad55;
      scale: 1;
      transform: translate(0, 0);
      box-shadow: none;
    }
  }
</style>
