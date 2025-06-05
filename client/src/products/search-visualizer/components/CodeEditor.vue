<script setup lang="ts">
  import { computed } from 'vue';
  import { Codemirror } from 'vue-codemirror';
  import { javascript } from '@codemirror/lang-javascript';
  import { oneDark } from '@codemirror/theme-one-dark';
  // import type { EditorState } from '@codemirror/state';
  // import readOnlyRangesExtension from 'codemirror-readonly-ranges';
  import { CODE_MIRROR_DARK_BACKGROUND } from '../colors';

  const code = defineModel<string>();

  // const getReadOnlyRanges = (targetState: EditorState) => [
  //   {
  //     from: undefined,
  //     to: targetState.doc.line(1).to,
  //   },
  //   {
  //     from: targetState.doc.line(targetState.doc.lines - 1).to,
  //     to: undefined,
  //   },
  // ];

  const extensions = computed(() => [
    /**
     * adds javascript syntax highlighting
     */
    javascript(),
    /**
     * adds dark theme
     */
    oneDark,
    /**
     * makes certain lines read-only
     */
    // readOnlyRangesExtension(getReadOnlyRanges),
  ]);
</script>

<template>
  <div class="relative w-full h-full">
    <codemirror
      v-model="code"
      :tab-size="2"
      :extensions="extensions"
    />

    <!-- background matte -->
    <div
      :style="{
        backgroundColor: `#${CODE_MIRROR_DARK_BACKGROUND}`,
      }"
      :class="['absolute', 'top-0', 'w-full', 'h-full', '-z-10']"
    ></div>
  </div>
</template>
