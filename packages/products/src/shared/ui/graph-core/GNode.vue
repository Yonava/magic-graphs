<script setup lang="ts">
  import { resolveNodeStyles } from '@magic/graph-plugins/plugins/canvas/themes/index';
  import type { CoreNode } from '@magic/graph/types';

  import { computed, onUnmounted, ref } from 'vue';

  import { nonNullGraph as graph } from '../../../shared/globalGraph.ts';

  type NodeProps = {
    size?: number;
    node: CoreNode;
  };

  const props = withDefaults(defineProps<NodeProps>(), {
    size: 60,
  });

  const theme = ref(
    resolveNodeStyles(graph.value.canvas.theme._resolveToken, props.node),
  );

  const borderSize = computed(() =>
    Math.round(Math.max(1, Math.log(props.size))),
  );

  const setFocus = () => {
    graph.value.focus.set([props.node.id]);
  };

  const updateTheme = setInterval(() => {
    theme.value = resolveNodeStyles(
      graph.value.canvas.theme._resolveToken,
      props.node,
    );
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
      color: theme.textColor,
      border: `${borderSize}px solid ${theme.borderColor}`,
      backgroundColor: theme.color,
      height: `${size}px`,
      width: `${size}px`,
    }"
  >
    <slot>
      {{ theme.text }}
    </slot>
  </div>
</template>
