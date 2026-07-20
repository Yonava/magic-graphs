import { ReadonlyEventHub } from '@graph/primitives/events/createEventHub';
import {
  ElementAdditionPayload,
  ElementRemovalPayload,
} from '@graph/primitives/transactions/types';
import { CoreEdge, CoreNode } from '@graph/primitives/types';
import { DeepReadonly } from 'ts-essentials';

import { CoreEventMap } from './events.ts';
import { EdgeWeightEntry } from './weights/types.ts';

// owned and emitted by create-graph (not core itself), since only create-graph knows when a
// fully-composed plugin action has finished, not just the underlying core transaction — this
// is the end-user event vocabulary, and create-graph has unilateral say over its shape.
//
// lives in @graph/core (not @graph/create-graph) so both @graph/plugins-shared and
// @graph/create-graph can import it without a cycle — both already depend on @graph/core,
// and @graph/create-graph depends on @graph/plugins-shared, so the reverse isn't possible
// under this repo's TS project references. core itself never emits these; create-graph
// derives them by wrapping the calls it already has authority over (actions, weight
// controls), never by subscribing to CoreEventMap.
export type ConsumerEventMap = {
  /** triggered when any nodes or edges are added or removed, or an edge weight is changed */
  onStructureChange: () => void;
  /** when nodes are added to the graph as part of a single graph action */
  onNodesAdded: (nodes: Readonly<CoreNode[]>) => void;
  /** when nodes are removed from the graph as part of a single graph action */
  onNodesRemoved: (
    removedNodeIds: Readonly<CoreNode['id'][]>,
    removedEdgeIds: Readonly<CoreEdge['id'][]>,
  ) => void;
  /** when one or more edges are added to the graph as part of a single graph action */
  onEdgesAdded: (edges: Readonly<CoreEdge[]>) => void;
  /** when one or more edges are removed from the graph as part of a single graph action */
  onEdgesRemoved: (edgeIds: Readonly<CoreEdge['id'][]>) => void;
  /** when any nodes or edges are added */
  onElementsAdded: (additions: DeepReadonly<ElementAdditionPayload>) => void;
  /** when any nodes or edges are removed */
  onElementsRemoved: (removals: DeepReadonly<ElementRemovalPayload>) => void;
  /** when one or more edge weights are changed */
  onEdgeWeightsChanged: (weights: DeepReadonly<EdgeWeightEntry[]>) => void;
};

// deliberately not part of ConsumerEventMap: it's plumbing for getNodes()/getEdges()
// staleness, not something the primary consumer vocabulary should surface. lives under
// _internal on ConsumerEventsHub, same as coreEvents, for plugin wrappers and anyone
// reaching past the curated surface on purpose.
export type GettersInvalidationEventMap = {
  /**
   * triggered once the getNodes()/getEdges() snapshot has been recomputed after an
   * invalidation. derived by create-graph itself (structural changes, edge weight
   * changes) or by a plugin author calling the `invalidateGetters` function handed to
   * every plugin — never emitted by a plugin directly onto this hub.
   */
  onGettersInvalidated: () => void;
};

// the only surface plugins and graph consumers get by default: the curated consumer
// vocabulary directly at the top level. raw CoreEventMap is a machinery escape hatch,
// namespaced under _internal so it doesn't crowd the primary autocomplete — same
// "underscore signals deliberate, semi-public, not the intended path" convention as
// _resolveToken. this shape will likely change (e.g. _internal growing more fields);
// consumers reaching into _internal should expect it to move.
export type ConsumerEventsHub = ReadonlyEventHub<ConsumerEventMap> & {
  _internal: {
    coreEvents: ReadonlyEventHub<CoreEventMap>;
    gettersInvalidation: ReadonlyEventHub<GettersInvalidationEventMap>;
  };
};
