<script setup lang="ts">
  import { Primitive, type PrimitiveProps } from 'reka-ui';

  import { computed, useAttrs } from 'vue';

  import { cn } from '../../cn.ts';
  import { useAttrClass } from '../../composables/useAttrClass.ts';
  import { type ButtonVariant, buttonVariants } from '../button/variants.ts';
  import Icon from '../icon/Icon.vue';

  defineOptions({ inheritAttrs: false });

  interface Props extends PrimitiveProps {
    // the icon to render, e.g. an mdi path from '@mdi/js'
    path: string;
    /**
     * required, plain-text accessible name for this button.
     * there's no visible text content, so this is the only thing
     * screen readers have to announce what the button does.
     */
    label: string;
    variant?: ButtonVariant;
    size?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    as: 'button',
    variant: 'solid',
    size: 20,
  });

  const base =
    'inline-flex cursor-pointer items-center justify-center rounded-md p-2 transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100';

  const attrs = useAttrs();

  const attrClass = useAttrClass();

  const classes = computed(() =>
    cn(base, buttonVariants[props.variant], attrClass.value),
  );
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :aria-label="label"
    v-bind="{ ...attrs, class: undefined }"
    :class="classes"
  >
    <Icon
      :path="path"
      :size="size"
    />
  </Primitive>
</template>
