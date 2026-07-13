<script setup lang="ts">
  import { ToggleGroupRoot } from 'reka-ui';

  import { computed, useAttrs } from 'vue';

  import { cn } from '../../cn.ts';
  import { useAttrClass } from '../../composables/useAttrClass.ts';

  defineOptions({ inheritAttrs: false });

  interface Props {
    disabled?: boolean;
  }

  defineProps<Props>();

  // radio-style: only one value can be selected at a time.
  // works whether the consumer passes v-model or not, same as ToggleButton.
  const selected = defineModel<string>();

  const attrs = useAttrs();

  const attrClass = useAttrClass();

  const classes = computed(() =>
    cn(
      'inline-flex divide-x divide-neutral-300 overflow-hidden rounded-md border border-neutral-300',
      attrClass.value,
    ),
  );
</script>

<template>
  <ToggleGroupRoot
    v-model="selected"
    type="single"
    :disabled="disabled"
    v-bind="{ ...attrs, class: undefined }"
    :class="classes"
  >
    <slot />
  </ToggleGroupRoot>
</template>
