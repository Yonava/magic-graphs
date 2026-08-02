import { AnimatedShapeFactories } from '@canvas/primitives/animation/index';
import { Shape } from '@canvas/primitives/types/index';
import { Coordinate } from '@canvas/primitives/types/utility';
import { MaybeGetter } from '@core/utils/maybeGetter/index';
import { ComputedTokenResolver } from '@graph/plugins-shared/computed-tokens';
import { CoreNode } from '@graph/primitives/types';

type RendererOptions = {
  shapes: AnimatedShapeFactories;
  resolveToken: ComputedTokenResolver;
};

// ----- NODE RENDERER -----

export type NodeRenderProps = CoreNode & {
  position: Coordinate;
};

type NodeRenderFunction = (node: NodeRenderProps) => Shape;

export type CreateNodeRenderer = (
  options: RendererOptions,
) => NodeRenderFunction;

// ----- EDGE RENDERER -----

export type EdgeRenderProps = {
  id: string;
  source: NodeRenderProps;
  target: NodeRenderProps;
  /** how many edges run between {@link source} and {@link target}, including this one */
  parallelEdgeCount: number;
  /** positions of the nodes adjacent to {@link source} and {@link target}, used to aim self directed edges away from them */
  neighborPositions: readonly Coordinate[];
};

type EdgeRenderFunction = (edge: EdgeRenderProps) => Shape;

export type CreateEdgeRenderer = (
  options: RendererOptions & {
    directed: boolean;
    labelled: boolean;
    labelTextInputColor: MaybeGetter<string>;
  },
) => EdgeRenderFunction;
