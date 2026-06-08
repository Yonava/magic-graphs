<script setup lang="ts">
  import { GraphUnderCursor } from '@magic/graph/plugins/canvas/types';

  import { computed, ref } from 'vue';

  import { nonNullGraph as graph } from '../../../../shared/globalGraph.ts';
  import GText from '../../graph-core/GText.vue';

  const mouseData = ref<GraphUnderCursor>({
    coords: { x: 0, y: 0 },
    items: [],
  });

  graph.value.events.subscribe('onGraphUnderCursorChange', (data) => {
    mouseData.value.coords = data.coords;
    mouseData.value.items = [...data.items];
  });

  const hoveredItems = computed(() => {
    return mouseData.value.items.map(
      (item) => `${item.graphType} - ${item.shape.name} (${item.id})`,
    );
  });
</script>

<template>
  <GText class="text-end">
    <div>
      Cursor At: (X = {{ mouseData.coords.x }}, Y = {{ mouseData.coords.y }})
    </div>
    <div>Items Hovered: {{ hoveredItems }}</div>
  </GText>
</template>
