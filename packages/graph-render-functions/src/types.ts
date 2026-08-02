import { AnimatedShapeFactories } from '@canvas/primitives/animation/index';
import { Shape } from '@canvas/primitives/types/index';
import { Coordinate } from '@canvas/primitives/types/utility';
import { ComputedTokenResolver } from '@graph/plugins-shared/computed-tokens';
import { CoreNode } from '@graph/primitives/types';

export type RenderFunctionOptions = {
  shapes: AnimatedShapeFactories;
  resolveToken: ComputedTokenResolver;
};

// ----- NODE RENDERER -----

export type NodeRenderProps = CoreNode & {
  position: Coordinate;
};

export type NodeRenderFunction = (node: NodeRenderProps) => Shape;

export type CreateNodeRenderFunction = (
  options: RenderFunctionOptions,
) => NodeRenderFunction;

// ----- EDGE RENDERER -----

export type EdgeRenderProps = {
  id: string;
  source: NodeRenderProps;
  target: NodeRenderProps;
};

export type EdgeRenderFunction = (edge: EdgeRenderProps) => Shape;

export type CreateEdgeRenderFunction = (
  options: RenderFunctionOptions & {
    directed: boolean;
    labelled: boolean;
    labelTextInputColor: (edge: EdgeRenderProps) => string;
    /** how many edges run between {@link source} and {@link target}, including this one */
    parallelEdgeCount: (edge: EdgeRenderProps) => number;
    /** positions of the nodes adjacent to {@link source} and {@link target}, used to aim self directed edges away from them */
    neighborPositions: (edge: EdgeRenderProps) => readonly Coordinate[];
  },
) => EdgeRenderFunction;

// ----- BOTH -----

/** the pair of render functions a graph draws all of its nodes and edges with */
export type RenderFunctions = {
  node: NodeRenderFunction;
  edge: EdgeRenderFunction;
};
