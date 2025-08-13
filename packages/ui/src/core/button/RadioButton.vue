<script setup lang="ts">
  import { useTinycolor } from "@ui/useTinycolor";
  import colors from "@magic/utils/colors";

  import { computed, ref, toRef } from "vue";

  const props = withDefaults(
    defineProps<{
      outlineColor?: string;
      color?: string;
      active?: boolean;
    }>(),
    {
      active: false,
      outlineColor: colors.WHITE,
      color: colors.GRAY_700,
    }
  );

  const outlineColorRef = toRef(props, "outlineColor");
  const outlineColor = useTinycolor(outlineColorRef);

  const hoverColorHex = computed(() => {
    const isDark = outlineColor.value.isDark();
    const newColor = isDark
      ? outlineColor.value.lighten(30)
      : outlineColor.value.darken(30);
    return newColor.toHexString();
  });

  const colorRef = toRef(props, "color");
  const color = useTinycolor(colorRef);

  const textColorHex = computed(() => {
    return color.value.isDark() ? colors.WHITE : colors.BLACK;
  });

  const borderColorHex = computed(() => {
    if (props.active) return props.outlineColor;
    if (hovered.value) return hoverColorHex.value;
    return colors.TRANSPARENT;
  });

  const classes = ["cursor-pointer", "rounded-xl", "p-1", "border-2"];

  const hovered = ref(false);
</script>

<template>
  <button
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    :class="classes"
    :style="{
      borderColor: borderColorHex,
      color: textColorHex,
    }"
  >
    <div
      :class="[
        'relative',
        'w-8',
        'h-8',
        'rounded-md',
        'flex',
        'items-center',
        'justify-center',
        'text-sm',
      ]"
      :style="{
        backgroundColor: props.color,
      }"
    >
      <slot></slot>
    </div>
  </button>
</template>
