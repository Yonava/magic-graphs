import { useNodeState } from '../shared/graph/useNodeState';

const initialState = useNodeState({
  setterTextTip: 'select initial state',
});

export default {
  initialState,
  reset: initialState.reset,
};
