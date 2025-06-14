<script setup lang="ts">
  import { ref } from 'vue';
  import type { Graph } from '@graph/types';
  import { useTheme } from '@graph/themes/useTheme';
  import type { ColorMap } from '@product/sandbox/theme/useMarkupColorizer';
  import type { Color } from '@utils/colors';
  import {
    DEFAULT_MARKUP_COLOR,
    MARKUP_USETHEME_ID,
  } from '@product/sandbox/constants';
  import InputColor from './InputColor.vue';
  import { THEMES } from '@graph/themes';

  const props = defineProps<{
    graph: Graph;
    colorMap: ColorMap;
  }>();

  const getColor = () => {
    const highlightedIds = Array.from(props.graph.focus.focusedItemIds.value);
    const itemColors = new Set(
      highlightedIds.map((id) => props.colorMap.get(id)),
    );
    if (itemColors.has(undefined)) return;
    if (itemColors.size !== 1) return;
    const color = itemColors.values().next().value;
    if (!color) return DEFAULT_MARKUP_COLOR;
    return color;
  };

  const activeColor = ref(getColor());

  const setActiveColor = (value: Color | undefined) => {
    for (const id of props.graph.focus.focusedItemIds.value) {
      if (value) {
        props.colorMap.set(id, value);
      } else {
        props.colorMap.delete(id);
      }
    }
    activeColor.value = value;
  };

  const colorAddedItem = ({ id }: { id: string }) => {
    if (!activeColor.value) return;
    props.colorMap.set(id, activeColor.value);
  };

  const recalculateActiveColor = async () => {
    if (props.graph.focus.focusedItemIds.value.size === 0) return;
    await new Promise((resolve) => setTimeout(resolve, 0));
    /**
     * wait for the next tick to ensure that onNodeAdded and onEdgeAdded
     * have a chance to set the color of the just added node or edge
     */
    activeColor.value = getColor();
  };

  props.graph.subscribe('onNodeAdded', colorAddedItem);
  props.graph.subscribe('onEdgeAdded', colorAddedItem);
  props.graph.subscribe('onFocusChange', recalculateActiveColor);

  const { setTheme } = useTheme(props.graph, MARKUP_USETHEME_ID + '-preview');

  const colorLinkPreview = () => {
    const { linkPreviewColor } = THEMES[props.graph.themeName.value];
    return activeColor.value ?? linkPreviewColor;
  };

  setTheme('linkPreviewColor', colorLinkPreview);
</script>

<template>
  <InputColor
    @update:model-value="setActiveColor"
    :model-value="activeColor"
  />
</template>
