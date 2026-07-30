<script setup lang="ts">
  import {
    DropdownMenuContent,
    type DropdownMenuContentProps,
    DropdownMenuPortal,
    DropdownMenuRoot,
    DropdownMenuTrigger,
  } from 'reka-ui';

  import { computed, useAttrs } from 'vue';

  import { cn } from '../../cn.ts';
  import { useAttrClass } from '../../composables/useAttrClass.ts';

  defineOptions({ inheritAttrs: false });

  interface Props {
    side?: DropdownMenuContentProps['side'];
    align?: DropdownMenuContentProps['align'];
  }

  withDefaults(defineProps<Props>(), {
    side: 'bottom',
    align: 'start',
  });

  const attrs = useAttrs();

  const attrClass = useAttrClass();

  const classes = computed(() =>
    cn(
      'z-50 min-w-48 rounded-md border border-neutral-200 bg-white p-1 shadow-md outline-none',
      'transition-[opacity,scale] duration-150 ease-[cubic-bezier(0.34,1.4,0.64,1)]',
      'starting:opacity-0 starting:scale-95',
      attrClass.value,
    ),
  );
</script>

<template>
  <!--
    non-modal so the menu behaves like canvas chrome rather than a dialog. a modal
    menu traps focus and disables pointer events on the rest of the page, which
    means the click that dismisses it never reaches the canvas underneath, leaving
    the canvas unfocused and reka handing focus to the trigger button on close.
    non-modal lets that click through to the canvas and opts into reka's own
    outside-dismissal path, which skips the focus handoff. escape still returns
    focus to the trigger, since there is nowhere else sensible to land.
  -->
  <DropdownMenuRoot :modal="false">
    <DropdownMenuTrigger as-child>
      <slot name="trigger" />
    </DropdownMenuTrigger>
    <DropdownMenuPortal>
      <DropdownMenuContent
        :side="side"
        :align="align"
        :side-offset="6"
        v-bind="{ ...attrs, class: undefined }"
        :class="classes"
      >
        <slot />
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
