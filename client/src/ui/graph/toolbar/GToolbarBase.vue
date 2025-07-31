<script setup lang="ts">
  import { useNonNullGraphColors } from '@graph/themes/useGraphColors';
  import type { TutorialControls } from '@graph/tutorials/types';
  import CToolbar from '@ui/core/toolbar/ToolbarBase.vue';

  import GToolbarHint from './GToolbarHint.vue';

  const colors = useNonNullGraphColors();

  defineProps<{
    hint?: TutorialControls;
  }>();
</script>

<template>
  <CToolbar
    :hint="hint"
    :color="colors.primary"
  >
    <slot></slot>
    <template #hint>
      <div class="absolute w-full translate-y-14 pointer-events-none">
        <GToolbarHint
          v-if="hint"
          :tutorial="hint"
        />
      </div>
    </template>
  </CToolbar>
</template>
