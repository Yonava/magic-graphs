<script setup lang="ts">
  import CIcon from '@ui/core/Icon.vue';
  import CPopoverTooltip from '@ui/core/PopoverTooltip.vue';
  import GWell from '@ui/graph/GWell.vue';
  import GButton from '@ui/graph/button/GButton.vue';

  withDefaults(
    defineProps<{
      /**
       * the text to display in the tooltip. supports html
       */
      tooltip: string;
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
  <CPopoverTooltip :offset="offset">
    <GButton
      v-bind="$attrs"
      tertiary
      class="px-2 py-1 flex items-center gap-1 rounded-lg"
    >
      <slot></slot>
      <CIcon icon="information-outline" />
    </GButton>
    <template #content>
      <GWell
        tertiary
        class="px-3 py-2 w-72 rounded-lg"
      >
        <div v-html="tooltip"></div>
      </GWell>
    </template>
  </CPopoverTooltip>
</template>
