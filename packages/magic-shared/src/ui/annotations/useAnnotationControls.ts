import { nullThrows } from '@core/utils/assert';

import { useProvidedGraph } from '../../product/useProvidedGraph.ts';

export const useAnnotationControls = () => {
  const graph = useProvidedGraph();
  return nullThrows(
    graph.magic.ui.data.annotations,
    'annotation controls not on graph instance!',
  );
};
