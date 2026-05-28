import { useNodeState } from '../shared/graph/useNodeState.ts';

const initialState = useNodeState({
  setterTextTip: 'select initial state',
});

export default {
  initialState,
  reset: initialState.reset,
};
