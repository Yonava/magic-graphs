<script setup lang="ts">
  import colors from '@utils/colors';
  import tinycolor from 'tinycolor2';

  import { computed, ref } from 'vue';

  const props = withDefaults(
    defineProps<{
      imageSrc?: string;
      color?: string;
      hoverColor?: string;
      title?: string;
      description?: string;
    }>(),
    {
      color: colors.GRAY_800,
    },
  );

  const hoverColor = computed(() => {
    if (props.hoverColor) return props.hoverColor;
    const color = tinycolor(props.color);
    const adjustedColor = color.isDark() ? color.lighten(10) : color.darken(10);
    return adjustedColor.toHexString();
  });

  const bgColor = computed(() =>
    hovered.value ? hoverColor.value : props.color,
  );

  const hovered = ref(false);
</script>

<template>
  <button
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    :style="{
      backgroundColor: bgColor,
    }"
    class="p-2 cursor-pointer text-left flex gap-4"
  >
    <div class="min-w-20 min-h-20 max-w-20 max-h-20 rounded-md">
      <img
        v-if="imageSrc"
        :src="imageSrc"
        class="rounded-md object-cover w-full h-full"
      />
    </div>
    <div class="flex flex-col gap-1">
      <h1 class="text-lg font-bold">
        {{ title }}
      </h1>
      <p class="text-sm opacity-80">
        {{ description }}
      </p>
    </div>
  </button>
</template>
