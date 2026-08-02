import { AnimatedShapeFactories } from '@canvas/primitives/animation/index';
import { Shape } from '@canvas/primitives/types/index';
import { Coordinate } from '@canvas/primitives/types/utility';
import { MaybeGetter } from '@core/utils/maybeGetter/index';
import { ComputedTokenResolver } from '@graph/plugins-shared/computed-tokens';
import { CoreNode } from '@graph/primitives/types';

type RenderFunctionOptions = {
  shapes: AnimatedShapeFactories;
  resolveToken: ComputedTokenResolver;
};

// ----- NODE RENDERER -----

export type NodeRenderProps = CoreNode & {
  position: Coordinate;
};

type NodeRenderFunction = (node: NodeRenderProps) => Shape;

export type CreateNodeRenderFunction = (
  options: RenderFunctionOptions,
) => NodeRenderFunction;

// ----- EDGE RENDERER -----

export type EdgeRenderProps = {
  id: string;
  source: NodeRenderProps;
  target: NodeRenderProps;
};

type EdgeRenderFunction = (edge: EdgeRenderProps) => Shape;

export type CreateEdgeRenderFunction = (
  options: RenderFunctionOptions & {
    directed: boolean;
    labelled: boolean;
    labelTextInputColor: MaybeGetter<string>;
    /** how many edges run between {@link source} and {@link target}, including this one */
    parallelEdgeCount: (edge: EdgeRenderProps) => number;
    /** positions of the nodes adjacent to {@link source} and {@link target}, used to aim self directed edges away from them */
    neighborPositions: (edge: EdgeRenderProps) => readonly Coordinate[];
  },
) => EdgeRenderFunction;
