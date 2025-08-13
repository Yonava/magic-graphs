import { useNodeState } from '@magic/graph/useNodeState';

const startNode = useNodeState({
  setterTextTip: 'select start node',
});

export default {
  startNode,
  reset: startNode.reset,
};
