import { useNodeState } from '../shared/graph/useNodeState.ts';

const startNode = useNodeState({
  setterTextTip: 'select start node',
});

export default {
  startNode,
  reset: startNode.reset,
};
