import { selectNode } from '../select';
import type { GNode, Graph } from '../types';
import { useGTextTip } from '@magic/ui/useGTextTip';

import { computed, readonly, ref } from 'vue';

type NodeStateOptions = {
  /**
   * a tip to show when the node is being set.
   * @default 'select a node'
   */
  setterTextTip: string;
};

const DEFAULT_NODE_STATE_OPTIONS: NodeStateOptions = {
  setterTextTip: 'select a node',
};

/**
 * a utility for managing the state of a node, providing
 * getters and setters for the node and a way to cancel the setter
 */
export const useNodeState = (options: Partial<NodeStateOptions> = {}) => {
  const { setterTextTip } = {
    ...DEFAULT_NODE_STATE_OPTIONS,
    ...options,
  };

  const node = ref<GNode>();
  const isSetting = ref(false);

  let cancelNodeSetter = () => { };

  const { showText, hideText } = useGTextTip(setterTextTip);

  const get = (graph: Graph) => {
    if (!node.value) return;
    return graph.getNode(node.value.id);
  };

  const set = async (graph: Graph) => {
    if (isSetting.value) return;
    isSetting.value = true;

    const { selectedItemPromise, cancelSelection } = selectNode(graph);
    cancelNodeSetter = cancelSelection;
    showText();
    node.value = await selectedItemPromise();
    hideText();

    isSetting.value = false;
  };

  const cancelSet = () => {
    hideText();
    cancelNodeSetter();
  };

  const reset = () => {
    node.value = undefined;
    cancelSet();
  };

  return {
    /**
     * gets the node on the graph passed in, returns the node if it exists
     * in the graph, otherwise returns undefined
     */
    get,
    /**
     * a promise that resolves when either the node is set or cancelled by `cancelSet`
     */
    set,
    /**
     * cancels the promise that `setNode` is waiting on and hides the text tip if showing
     */
    cancelSet,
    /**
     * true if the node is currently being set
     */
    isSetting: readonly(isSetting),

    /**
     * true if the node is set
     */
    isDefined: computed(() => node.value !== undefined),
    /**
     * true if the node is not set
     */
    isUndefined: computed(() => node.value === undefined),

    /**
     * the reactive source for tracking changes to the node with computed, watchers, etc.
     */
    ref: node,

    /**
     * resets the node to undefined
     */
    reset,
  };
};
