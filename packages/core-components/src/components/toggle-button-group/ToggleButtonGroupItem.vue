<script setup lang="ts">
  import { ToggleGroupItem } from 'reka-ui';

  import { computed, useAttrs } from 'vue';

  import { cn } from '../../cn.ts';
  import { useAttrClass } from '../../composables/useAttrClass.ts';
  import { toggleButtonBaseClasses } from '../toggle-button/variants.ts';

  defineOptions({ inheritAttrs: false });

  interface Props {
    value: string;
    disabled?: boolean;
  }

  defineProps<Props>();

  const attrs = useAttrs();

  const attrClass = useAttrClass();

  const classes = computed(() =>
    cn(
      toggleButtonBaseClasses,
      'focus-visible:z-10 focus-visible:ring-offset-0',
      attrClass.value,
    ),
  );
</script>

<template>
  <ToggleGroupItem
    :value="value"
    :disabled="disabled"
    v-bind="{ ...attrs, class: undefined }"
    :class="classes"
  >
    <slot />
  </ToggleGroupItem>
</template>
