<script setup lang="ts">
  import { ref } from 'vue';
  import type { Graph } from '@graph/types';
  import { useTheme } from '@graph/themes/useTheme';
  import type { MarkupSize } from '@product/graph-sandbox/types';
  import {
    DEFAULT_MARKUP_SIZE,
    MARKUP_USETHEME_ID,
    SIZE_TO_WIDTH,
  } from '@product/graph-sandbox/constants';
  import type { SizeMap } from '@product/graph-sandbox/theme/useMarkupSizer';
  import InputSize from './InputSize.vue';

  const props = defineProps<{
    graph: Graph;
    sizeMap: SizeMap;
  }>();

  const getSize = () => {
    const highlightedIds = Array.from(props.graph.focus.focusedItemIds.value);
    const itemSizes = new Set(
      highlightedIds.map((id) => props.sizeMap.get(id)),
    );
    if (itemSizes.has(undefined)) return;
    if (itemSizes.size !== 1) return;
    const size = itemSizes.values().next().value;
    if (!size) return DEFAULT_MARKUP_SIZE;
    return size;
  };

  const activeSize = ref(getSize());

  const setActiveSize = (value: MarkupSize | undefined) => {
    for (const id of props.graph.focus.focusedItemIds.value) {
      if (value) {
        props.sizeMap.set(id, value);
      } else {
        props.sizeMap.delete(id);
      }
    }
    activeSize.value = value;
    props.graph.marquee.updateEncapsulatedNodeBox();
  };

  const sizeAddedItem = ({ id }: { id: string }) => {
    if (!activeSize.value) return;
    props.sizeMap.set(id, activeSize.value);
  };

  const recalculateActiveSize = async () => {
    if (props.graph.focus.focusedItemIds.value.size === 0) return;
    /**
     * wait for the next tick to ensure that onNodeAdded and onEdgeAdded
     * have a chance to set the size of the just added node or edge
     */
    await new Promise((resolve) => setTimeout(resolve, 0));
    activeSize.value = getSize();
  };

  props.graph.subscribe('onNodeAdded', sizeAddedItem);
  props.graph.subscribe('onEdgeAdded', sizeAddedItem);
  props.graph.subscribe('onFocusChange', recalculateActiveSize);

  const { setTheme } = useTheme(props.graph, MARKUP_USETHEME_ID + '-preview');
  const sizeLinkPreview = () =>
    // @ts-ignore the weirdest ghost error ever!
    SIZE_TO_WIDTH[activeSize.value ?? DEFAULT_MARKUP_SIZE];
  setTheme('linkPreviewWidth', sizeLinkPreview);
</script>

<template>
  <InputSize
    @update:model-value="setActiveSize"
    :model-value="activeSize"
  />
</template>
