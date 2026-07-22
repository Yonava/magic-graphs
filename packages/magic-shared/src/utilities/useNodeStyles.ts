import { ref } from 'vue';

import { GNode, Graph } from '../graph/types.ts';

export const useNodeStyles = (graph: Graph, nodeId: GNode['id']) => {
  const styles = ref(graph.theme.resolveNodeStyles({ id: nodeId }));
  const syncToRef = () => {
    styles.value = graph.theme.resolveNodeStyles({
      id: nodeId,
    });
  };
  graph.canvas.events.subscribe('onDraw', syncToRef);

  const dispose = () => graph.canvas.events.unsubscribe('onDraw', syncToRef);

  return {
    styles,
    dispose,
  };
};
