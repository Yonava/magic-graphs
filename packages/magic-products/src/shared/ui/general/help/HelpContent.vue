<script setup lang="ts">
  import HelpLinks from './HelpLinks.vue';
  import HelpShortcuts from './HelpShortcuts.vue';
  import HelpVideos from './HelpVideos.vue';
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-3 mt-4">Here's Some Help 👇</h1>

    <div class="flex flex-col gap-4 h-[500px] overflow-auto">
      <HelpShortcuts />
      <HelpLinks />
      <HelpVideos />
    </div>
  </div>
</template>
