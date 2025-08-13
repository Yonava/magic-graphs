import { useNodeState } from '@graph/useNodeState';

const initialState = useNodeState({
  setterTextTip: 'select initial state',
});

export default {
  initialState,
  reset: initialState.reset,
};
