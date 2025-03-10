<script setup lang="ts">
  import { computed, onUnmounted, ref } from 'vue';
  import { nonNullGraph as graph } from '@graph/global';
  import { resolveThemeForNode } from '@graph/themes';
  import type { GNode } from '@graph/types';

  type NodeProps = {
    size?: number;
    node: GNode;
  };

  const props = withDefaults(defineProps<NodeProps>(), {
    size: 60,
  });

  const theme = ref(resolveThemeForNode(graph.value.getTheme, props.node));

  const borderSize = computed(() =>
    Math.round(Math.max(1, Math.log(props.size))),
  );

  const setFocus = () => {
    graph.value.focus.set([props.node.id]);
  };

  const updateTheme = setInterval(() => {
    theme.value = resolveThemeForNode(graph.value.getTheme, props.node);
  }, 100);

  onUnmounted(() => {
    clearInterval(updateTheme);
  });
</script>

<template>
  <div
    @click="setFocus"
    :class="[
      'flex',
      'font-bold',
      'items-center',
      'justify-center',
      'rounded-full',
      'cursor-pointer',
    ]"
    :style="{
      color: theme.nodeTextColor,
      border: `${borderSize}px solid ${theme.nodeBorderColor}`,
      backgroundColor: theme.nodeColor,
      height: `${size}px`,
      width: `${size}px`,
    }"
  >
    <slot>
      {{ theme.nodeText }}
    </slot>
  </div>
</template>
