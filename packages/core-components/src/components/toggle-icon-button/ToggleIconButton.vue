<script setup lang="ts">
  import { Toggle } from 'reka-ui';

  import { computed, useAttrs } from 'vue';

  import { cn } from '../../cn.ts';
  import { useAttrClass } from '../../composables/useAttrClass.ts';
  import { type ButtonVariant, buttonVariants } from '../button/variants.ts';
  import Icon from '../icon/Icon.vue';
  import Tooltip from '../tooltip/Tooltip.vue';

  defineOptions({ inheritAttrs: false });

  interface Props {
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
    disabled?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    variant: 'solid',
    size: 20,
  });

  // works whether the consumer passes v-model or not: bound if they do,
  // otherwise a plain local ref that just holds its own state.
  const pressed = defineModel<boolean>();

  const base =
    'inline-flex cursor-pointer items-center justify-center rounded-md p-2 transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100';

  const attrs = useAttrs();

  const attrClass = useAttrClass();

  const classes = computed(() =>
    cn(base, buttonVariants[props.variant], attrClass.value),
  );

  console.log(props.label);
</script>

<template>
  <Tooltip :label="label">
    <template #trigger>
      <Toggle
        v-model="pressed"
        :disabled="disabled"
        :aria-label="label"
        v-bind="{ ...attrs, class: undefined }"
        :class="classes"
      >
        <Icon
          :path="path"
          :size="size"
        />
      </Toggle>
    </template>
  </Tooltip>
</template>
