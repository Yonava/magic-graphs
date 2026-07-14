<script setup lang="ts">
  import { DropdownMenuItem } from 'reka-ui';

  import { computed, useAttrs } from 'vue';

  import { cn } from '../../cn.ts';
  import { useAttrClass } from '../../composables/useAttrClass.ts';

  defineOptions({ inheritAttrs: false });

  const attrs = useAttrs();

  const attrClass = useAttrClass();

  const classes = computed(() =>
    cn(
      'block cursor-pointer rounded-sm outline-none transition-colors',
      'focus-visible:bg-neutral-100 data-[highlighted]:bg-neutral-100',
      attrClass.value,
    ),
  );
</script>

<template>
  <DropdownMenuItem
    as-child
    v-bind="{ ...attrs, class: undefined }"
    :class="classes"
  >
    <slot />
  </DropdownMenuItem>
</template>
