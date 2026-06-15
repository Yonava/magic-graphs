import { CoreEventMap } from '@magic/graph/core/events';
import { GraphCoreControls } from '@magic/graph/core/types';
import { CanvasEventMap } from '@magic/graph/plugins/canvas/events';
import { CanvasPlugin } from '@magic/graph/plugins/canvas/types';
import { GraphPlugin } from '@magic/graph/types';
import { MaybeGetter } from '@magic/utils/maybeGetter/index';

export type NodeLabelEntry = {
  nodeId: string;
  label: string;
};

export type NodeLabelUpdate = {
  nodeId: string;
  label: MaybeGetter<string, [string]>;
};

export type NodeLabelStoreControls = {
  /** Returns the label of a node. */
  get: (nodeId: string) => string;
  /** Updates a single node's label. */
  set: (label: NodeLabelUpdate) => void;
  /** Updates multiple nodes' labels. */
  setMany: (labels: NodeLabelUpdate[]) => NodeLabelEntry[];
  /** @internal */
  _internal: {
    nodeIdToLabel: Map<string, string>;
  };
};

type NodeLabelPlugin = {
  /**
   * node label plugin controls
   */
  labels: GraphPlugin<NodeLabelStoreControls>;
};

export type GraphWithNodeLabel<
  TransactionWrapperOptions,
  EventMap extends CoreEventMap,
  Plugins,
> = GraphCoreControls<
  TransactionWrapperOptions,
  EventMap & CanvasEventMap,
  Plugins & CanvasPlugin & NodeLabelPlugin,
  { label: string }
>;
