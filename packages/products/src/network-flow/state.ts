import { useNodeState } from '@graph/useNodeState';

const sourceNode = useNodeState({
  setterTextTip: 'select source node',
});

const sinkNode = useNodeState({
  setterTextTip: 'select sink node',
});

export default {
  sourceNode,
  sinkNode,
  reset: () => {
    sourceNode.reset();
    sinkNode.reset();
  },
};
