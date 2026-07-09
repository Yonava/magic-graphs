import { nullThrows } from '@core/utils/assert';

import { NodeZScoreOptions, getNodeZScores } from './nodeZScores.ts';

const BASE_NODE_PRIORITY = 2;

export const createNodeCanvasElementPriorityGetter = (
  options: NodeZScoreOptions,
) => {
  // const zScores = getNodeZScores(options);
  // TODO for perf reasons we need to be pre-computing zScores only once on every draw cycle!
  return (nodeId: string) => {
    const nodeZScore = nullThrows(
      getNodeZScores(options).get(nodeId),
      `could not resolve z score from node with id: ${nodeId}`,
    );
    return nodeZScore + BASE_NODE_PRIORITY;
  };
};
