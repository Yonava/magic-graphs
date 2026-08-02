import { Coordinate } from '@canvas/primitives/types/utility';
import { getEdgesBetweenConnectedNodes } from '@graph/core/helpers/node';
import { CoreEdge } from '@graph/primitives/types';
import {
  RenderFunctionOptions,
  createEdgeRenderFunction,
} from '@graph/render-functions/index';
import { getNeighborPositions } from '@graph/render-functions/utils/getNeighborPositions';

type Props = {
  directed: boolean;
  labelled: boolean;
  labelTextInputColor: () => string;
  /** must capture both edges and phantom edges */
  allEdges: () => readonly CoreEdge[];
  /** must capture both nodes and phantom nodes */
  getNodePosition: () => Readonly<Coordinate>;
} & RenderFunctionOptions;

// the default edge renderer will not work with the phantom plugin since edge rendering requires
// graph context (like other nodes and edges around it) to work properly.
// IE for base edges to render properly alongside phantom edges, they must be able to see phantom edges and vice versa
export const createPhantomCompatibleEdgeRenderFunction = (props: Props) => {
  const { allEdges, getNodePosition, ...rest } = props;
  return createEdgeRenderFunction({
    parallelEdgeCount: (edge) => {
      const connectedEdges = getEdgesBetweenConnectedNodes(props.allEdges());
      return connectedEdges(edge.source.id, edge.target.id).length;
    },
    neighborPositions: (edge) => {
      return getNeighborPositions(edge, props.allEdges(), getNodePosition);
    },
    ...rest,
  });
};
