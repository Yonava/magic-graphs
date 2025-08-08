<script setup lang="ts">
  import Popover from 'primevue/popover';

  import { ref } from 'vue';

  withDefaults(
    defineProps<{
      /**
       * the offset of the popover content from the activator (in pixels)
       * @default 12
       */
      offset?: string | number;
    }>(),
    {
      offset: 12,
    },
  );

  const op = ref();

  const toggle = (ev: MouseEvent) => {
    op.value.toggle(ev);
  };

  const isOpen = ref(false);
</script>

<template>
  <slot
    name="activator"
    :toggle="toggle"
    :is-open="isOpen"
  ></slot>
  <Popover
    ref="op"
    @show="isOpen = true"
    @hide="isOpen = false"
    unstyled
  >
    <div :style="{ transform: `translateY(${offset}px)` }">
      <slot></slot>
    </div>
  </Popover>
</template>
