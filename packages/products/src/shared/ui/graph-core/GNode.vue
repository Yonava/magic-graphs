<script setup lang="ts">
  import { CoreNode } from '@graph/primitives/types';

  import { computed, onUnmounted, ref } from 'vue';

  import { nonNullGraph as graph } from '../../../shared/globalGraph.ts';

  type NodeProps = {
    size?: number;
    node: CoreNode;
  };

  const props = withDefaults(defineProps<NodeProps>(), {
    size: 60,
  });

  const theme = ref(graph.value.theme.resolveNodeStyles(props.node));

  const borderSize = computed(() =>
    Math.round(Math.max(1, Math.log(props.size))),
  );

  const setFocus = () => {
    graph.value.focus.set([props.node.id]);
  };

  const updateTheme = () => {
    theme.value = graph.value.theme.resolveNodeStyles(props.node);
  };

  graph.value.events.subscribe('onDraw', updateTheme);

  onUnmounted(() => {
    graph.value.events.unsubscribe('onDraw', updateTheme);
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
      color: theme.text.color,
      border: `${borderSize}px solid ${theme.border.color}`,
      backgroundColor: theme.color,
      height: `${size}px`,
      width: `${size}px`,
    }"
  >
    <slot>
      {{ theme.text.content }}
    </slot>
  </div>
</template>
