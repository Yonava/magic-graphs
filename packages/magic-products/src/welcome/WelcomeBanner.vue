<script setup lang="ts">
  import VStack from '@magic/shared/VStack';
  import { useThemeToClasses } from '@magic/shared/useThemeToClasses';

  const taglineClasses = useThemeToClasses({
    dark: 'text-gray-300',
    light: 'text-gray-700',
  });
</script>

<template>
  <VStack class="items-center gap-1 select-none">
    <h1 class="text-magic text-6xl font-black tracking-tight">Magic Graphs</h1>
    <p :class="`text-lg font-medium ${taglineClasses}`">
      Computer science theory you can grab with a mouse.
    </p>
  </VStack>
</template>
