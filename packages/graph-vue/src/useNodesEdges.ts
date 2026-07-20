import { ConsumerEventsHub } from '@graph/core/consumer-events';

import { computed, shallowRef } from 'vue';

type NodesEdgesGetters<Node, Edge> = {
  getNodes: () => Node[];
  getEdges: () => Edge[];
};

export const useNodesEdges = <Node, Edge>(
  events: ConsumerEventsHub,
  graph: NodesEdgesGetters<Node, Edge>,
) => {
  const refresh = shallowRef(0);
  // onGettersInvalidated lives off the curated consumer hub on purpose (see
  // ConsumerEventsHub) — this wrapper is exactly the kind of plugin-adjacent internal
  // consumer it's meant for, not part of the app-facing event vocabulary.
  events._internal.gettersInvalidation.subscribe(
    'onGettersInvalidated',
    () => refresh.value++,
  );

  return {
    nodes: computed(() => {
      refresh.value;
      return graph.getNodes();
    }),
    edges: computed(() => {
      refresh.value;
      return graph.getEdges();
    }),
  };
};
