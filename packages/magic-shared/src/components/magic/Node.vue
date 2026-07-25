<script setup lang="ts">
  import { StyleValue, computed, onUnmounted } from 'vue';

  import { GNode } from '../../graph/types.ts';
  import { useProvidedGraph } from '../../product/useProvidedGraph.ts';
  import { useNodeStyles } from '../../theme/index.ts';

  const props = defineProps<{
    id: GNode['id'];
    scale?: number;
  }>();

  const graph = useProvidedGraph();

  const { styles, dispose } = useNodeStyles(graph, () => props.id);

  const toPixels = (number: number) => number + 'px';

  const nodeStyle = computed<StyleValue>(() => ({
    width: toPixels(styles.value.size * 2),
    height: toPixels(styles.value.size * 2),
    borderStyle: 'solid',
    borderWidth: toPixels(styles.value.border.width),
    borderColor: styles.value.border.color,
    backgroundColor: styles.value.color,
    fontSize: toPixels(styles.value.text.size),
    fontWeight: styles.value.text.fontWeight,
    display: 'grid',
    placeItems: 'center',
  }));

  onUnmounted(dispose);
</script>

<template>
  <div
    class="rounded-full"
    :style="nodeStyle"
  >
    <span class="label">{{ styles.text.content }}</span>
  </div>
</template>

<style scoped>
  /*
    centering aligns the line box, which reserves the font's descender space
    below the baseline. a label made of caps and digits never reaches into that
    space, so the glyph settles below the middle. trimming the box to the cap
    and baseline edges makes the letterforms themselves the thing being
    centered. the trim has to sit on the element that holds the text, not on the
    grid container above it.
  */
  .label {
    display: block;
    line-height: 1;
    text-box: trim-both cap alphabetic;
  }
</style>
