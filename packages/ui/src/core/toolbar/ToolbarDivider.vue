<script setup lang="ts">
  import colors from '@utils/colors';

  withDefaults(
    defineProps<{
      color?: string;
    }>(),
    {
      color: colors.GRAY_100 + '20',
    },
  );
</script>

<template>
  <div
    :style="{ backgroundColor: color }"
    class="w-[1px] h-6 mx-1"
  ></div>
</template>
