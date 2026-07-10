<script setup lang="ts">
  import { Toggle } from 'reka-ui';
  import { computed, useAttrs } from 'vue';

  import { cn } from '../../cn.ts';
  import { useAttrClass } from '../../composables/useAttrClass.ts';
  import { toggleButtonClasses } from './variants.ts';

  defineOptions({ inheritAttrs: false });

  interface Props {
    disabled?: boolean;
  }

  defineProps<Props>();

  // works whether the consumer passes v-model or not: bound if they do,
  // otherwise a plain local ref that just holds its own state.
  const pressed = defineModel<boolean>();

  const attrs = useAttrs();

  const attrClass = useAttrClass();

  const classes = computed(() => cn(toggleButtonClasses, attrClass.value));
</script>

<template>
  <Toggle
    v-model="pressed"
    :disabled="disabled"
    v-bind="{ ...attrs, class: undefined }"
    :class="classes"
  >
    <slot />
  </Toggle>
</template>
