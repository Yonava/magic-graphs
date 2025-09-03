import { useNodeState } from '@magic/products/shared/graph/useNodeState';

const startNode = useNodeState({
  setterTextTip: 'select start node',
});

export default {
  startNode,
  reset: startNode.reset,
};
