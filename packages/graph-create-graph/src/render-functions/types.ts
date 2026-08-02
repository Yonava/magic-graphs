import { AnimatedShapeFactories } from '@canvas/primitives/animation/index';
import { Shape } from '@canvas/primitives/types/index';
import { Coordinate } from '@canvas/primitives/types/utility';
import { MaybeGetter } from '@core/utils/maybeGetter/index';
import { ComputedTokenResolver } from '@graph/plugins-shared/computed-tokens/internals/createComputedTokenResolver';
import { CoreEdge, CoreNode } from '@graph/primitives/types';

type RendererOptions = {
  shapes: AnimatedShapeFactories;
  token: ComputedTokenResolver;
};

// ----- NODE RENDERER -----

type DefaultNode = CoreNode & {
  position: Coordinate;
};

type NodeRenderFunction<Node extends CoreNode = DefaultNode> = (
  node: Node,
) => Shape;

export type CreateNodeRenderer<Node extends CoreNode = DefaultNode> = (
  options: RendererOptions,
) => NodeRenderFunction<Node>;

// ----- EDGE RENDERER -----

type DefaultEdge = {
  id: string;
  source: DefaultNode;
  target: DefaultNode;
};

type EdgeRenderFunction<Edge extends DefaultEdge = DefaultEdge> = (
  edge: Edge,
) => Shape;

export type CreateEdgeRenderer<Edge extends DefaultEdge = DefaultEdge> = (
  options: RendererOptions & {
    directed: boolean;
    labelled: boolean;
    labelTextInputColor: MaybeGetter<string>;
    getEdgesAlongPath: (
      nodeA: CoreNode['id'],
      nodeB: CoreNode['id'],
    ) => readonly CoreEdge[];
    getEdges: () => readonly CoreEdge[];
    getNodePosition: (nodeId: CoreNode['id']) => Coordinate;
  },
) => EdgeRenderFunction<Edge>;
