<script setup lang="ts">
  import Popover from './Popover.vue';

  withDefaults(
    defineProps<{
      /**
       * the offset of the popover content from the activator (in pixels)
       * @default 4
       */
      offset?: string | number;
    }>(),
    {
      offset: 4,
    },
  );
</script>

<template>
  <Popover :offset="offset">
    <template #activator="{ toggle }">
      <div
        @mouseenter="toggle"
        @mouseleave="toggle"
      >
        <slot><!-- optional fallback --></slot>
      </div>
    </template>
    <slot name="content"></slot>
  </Popover>
</template>
