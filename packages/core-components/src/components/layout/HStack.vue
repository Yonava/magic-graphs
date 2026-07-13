<script setup lang="ts">
  import { Primitive, type PrimitiveProps } from 'reka-ui';

  import { computed, useAttrs } from 'vue';

  import { cn } from '../../cn.ts';
  import { useAttrClass } from '../../composables/useAttrClass.ts';

  // static map so tailwind's scanner can see the literal class names
  const gapClasses = {
    0: 'gap-0',
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
  } as const;

  defineOptions({ inheritAttrs: false });

  interface Props extends PrimitiveProps {
    gap?: keyof typeof gapClasses;
  }

  const props = withDefaults(defineProps<Props>(), {
    as: 'div',
    gap: 2,
  });

  const attrs = useAttrs();

  const attrClass = useAttrClass();

  const classes = computed(() =>
    cn('flex flex-row items-center', gapClasses[props.gap], attrClass.value),
  );
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    v-bind="{ ...attrs, class: undefined }"
    :class="classes"
  >
    <slot />
  </Primitive>
</template>
