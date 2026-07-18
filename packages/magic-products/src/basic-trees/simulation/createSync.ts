import { Graph } from '@magic/shared/graph';

import { compareCompanion } from './compareCompanion.ts';
import { treeArrayToGraph } from './treeArrayToGraph.ts';
import { AVLFrame } from './types.ts';

const ROOT_POSITION = {
  x: 800,
  y: 400,
};

export const createSync = (graph: Graph) => (frame: AVLFrame) => {
  const finalize = graph.animation.auto();

  graph.actions.removeElements(
    {
      nodes: graph.nodes.value,
      edges: [],
    },
    {},
  );

  const graphState = treeArrayToGraph(frame.root, ROOT_POSITION);
  if (frame.action === 'compare') compareCompanion(frame, graphState);

  graph.actions.addElements(graphState, { focus: false });

  finalize();
};
