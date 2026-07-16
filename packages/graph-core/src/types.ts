import { TransitControls } from '@graph/primitives/transit/types';
import { CoreEdge, CoreNode } from '@graph/primitives/types';
import Fraction from 'fraction.js';

import { CoreGraphHelpers } from './helpers/types.ts';
import { CoreOptions } from './options.ts';
import { NodePositionStoreControls, Position } from './positions/types.ts';
import { EdgeWeightStoreControls } from './weights/types.ts';

export type CoreControls = {
  nodes: Readonly<CoreNode[]>;
  edges: Readonly<CoreEdge[]>;

  isNode: (id: string) => boolean;
  isEdge: (id: string) => boolean;

  nodeIdToIndex: (id: string) => number;
  edgeIdToIndex: (id: string) => number;

  metadata: Readonly<CoreOptions>;

  helpers: CoreGraphHelpers;
  positions: NodePositionStoreControls;
  weights: EdgeWeightStoreControls;
};

type NodePositionTransitEncode = {
  id: string;
  position: Position;
};

type EdgeWeightsTransitEncode = {
  id: string;
  weight: string; // serialized fraction encoding
};

export type CoreTransitPayload = {
  nodes: CoreNode[];
  edges: CoreEdge[];
  nodePositions: NodePositionTransitEncode[];
  edgeWeights: EdgeWeightsTransitEncode[];
};

export type CoreTransitControls = TransitControls<CoreTransitPayload>;
