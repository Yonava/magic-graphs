<script setup lang="ts">
  import { useClassAttrs } from '@ui/useClassAttrs';
  import { twMerge } from 'tailwind-merge';
  import tinycolor from 'tinycolor2';

  import { computed, ref } from 'vue';

  const props = defineProps<{
    /**
     * the background color of the button.
     */
    color?: string;
    /**
     * the text color of the button. if not set,
     * it will be automatically determined based on the background color.
     */
    textColor?: string;
    /**
     * whether the button is disabled.
     */
    disabled?: boolean;
  }>();

  const color = computed(() => {
    if (!props.color) return;
    const tinycolorInstance = tinycolor(props.color);
    if (!tinycolorInstance.isValid()) {
      throw new Error('invalid color provided to button');
    }
    return tinycolorInstance;
  });

  const hoverColor = computed(() => {
    if (!color.value) return;
    const isDark = color.value.isDark();
    const newColor = color.value.clone();
    return isDark ? newColor.lighten(10) : newColor.darken(10);
  });

  const bgColorHex = computed(() => {
    if (hovered.value) {
      return hoverColor.value?.toHexString();
    } else {
      return color.value?.toHexString();
    }
  });

  const parentClassList = useClassAttrs();

  const defaultButtonClasses = [
    'px-2',
    'py-1',

    'bg-gray-800',
    'text-gray-200',

    'dark:bg-gray-200',
    'dark:text-gray-800',

    'hover:bg-gray-700',
    'dark:hover:bg-gray-300',

    'rounded-md',
    'cursor-pointer',
    'font-bold',

    'transition',
    'duration-100',

    'select-none',

    'flex',
    'justify-center',
    'items-center',
    'text-center',
  ];

  const classes = computed(() => {
    const twClasses = twMerge(defaultButtonClasses, parentClassList.value);
    return twClasses;
  });

  const disabled = computed(() => props.disabled);

  const textColor = computed(() => {
    if (props.textColor) {
      return props.textColor;
    }

    if (!color.value) return;
    return color.value.isDark() ? 'white' : 'black';
  });

  const styles = computed(() => {
    const disabledStyles = {
      pointerEvents: 'none',
      opacity: 0.5,
      cursor: 'not-allowed',
    } as const;

    const colorStyles = {
      backgroundColor: bgColorHex.value,
      color: textColor.value,
    } as const;

    return {
      ...(props.color ? colorStyles : {}),
      ...(disabled.value ? disabledStyles : {}),
    };
  });

  const hovered = ref(false);
</script>

<template>
  <button
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
    :class="classes"
    :style="styles"
  >
    <slot></slot>
  </button>
</template>
