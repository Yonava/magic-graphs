import { CoreEdge } from '@magic/graph-core-infra/types';
import { CompoundTokenResolver } from '@magic/graph-plugins-shared/computed-tokens/createComputedTokenResolver';
import { CanvasControls } from '@magic/graph-plugins/canvas/types';
import { CoreControls } from '@magic/graph/core/types';
import { getLargestAngularSpaceBisector } from '@magic/shapes/helpers';
import { Shape } from '@magic/shapes/types/index';
import { nullThrows } from '@magic/utils/assert';

const WHITESPACE_BETWEEN_ARROW_TIP_AND_NODE_PX = 2;

type Props = {
  resolver: CompoundTokenResolver;
  edge: CoreEdge;
  controls: CoreControls & CanvasControls;
};

type EdgeRenderer = (props: Props) => Shape | undefined;

export const resolveEdgeComputedTokens =
  (resolver: CompoundTokenResolver) => (edge: CoreEdge) => ({
    color: resolver('edge.color', edge),
    width: resolver('edge.width', edge),
    cursor: resolver('edge.cursor', edge),
    text: {
      content: resolver('edge.text.content', edge),
      size: resolver('edge.text.size', edge),
      color: resolver('edge.text.color', edge),
      fontWeight: resolver('edge.text.fontWeight', edge),
    },
  });

export const edgeRenderer: EdgeRenderer = ({ resolver, edge, controls }) => {
  const styles = resolveEdgeComputedTokens(resolver)(edge);

  const { sourceNode: rawSourceNode, targetNode: rawTargetNode } =
    controls.helpers.edges.getConnectedNodes(edge.id);

  const sourcePosition = nullThrows(
    controls.positions.get(rawSourceNode.id),
    `could not resolve position for node with id ${rawSourceNode.id}`,
  );
  const targetPosition = nullThrows(
    controls.positions.get(rawTargetNode.id),
    `could not resolve position for node with id ${rawTargetNode.id}`,
  );

  const sourceNode = { ...rawSourceNode, ...sourcePosition } as const;
  const targetNode = { ...rawTargetNode, ...targetPosition } as const;

  const { isGraphDirected } = controls.settings.value;

  const edgesAlongPath = controls.helpers.nodes.getEdgesBetweenConnectedNodes(
    sourceNode.id,
    targetNode.id,
  );

  const multipleEdgesInPath = edgesAlongPath.length > 1;
  const isSelfDirected = targetNode.id === sourceNode.id;

  const angle = Math.atan2(
    targetNode.y - sourceNode.y,
    targetNode.x - sourceNode.x,
  );

  // resolve source and target node sizes to correctly offset the edge endpoints
  const sourceNodeSize = resolver('node.size', rawSourceNode);
  const targetNodeSize = resolver('node.size', rawTargetNode);
  const toNodeBorderWidth = resolver('node.border.width', rawTargetNode);

  const arrowHeadSpacingAwayFromNode =
    toNodeBorderWidth / 2 + WHITESPACE_BETWEEN_ARROW_TIP_AND_NODE_PX;

  const arrowDrawOffset = {
    x: (targetNodeSize + arrowHeadSpacingAwayFromNode) * Math.cos(angle),
    y: (targetNodeSize + arrowHeadSpacingAwayFromNode) * Math.sin(angle),
  };

  const edgeStart = { x: sourceNode.x, y: sourceNode.y };
  const edgeEnd = {
    x: targetNode.x - (isGraphDirected ? arrowDrawOffset.x : 0),
    y: targetNode.y - (isGraphDirected ? arrowDrawOffset.y : 0),
  };

  const bidirectionalEdgeSpacing = Math.max(styles.width * 1.2, 7);

  if (multipleEdgesInPath) {
    edgeStart.x += Math.cos(angle + Math.PI / 2) * bidirectionalEdgeSpacing;
    edgeStart.y += Math.sin(angle + Math.PI / 2) * bidirectionalEdgeSpacing;
    edgeEnd.x += Math.cos(angle + Math.PI / 2) * bidirectionalEdgeSpacing;
    edgeEnd.y += Math.sin(angle + Math.PI / 2) * bidirectionalEdgeSpacing;
  }

  const largestAngularSpaceBisector = getLargestAngularSpaceBisector(
    edgeStart,
    controls.edges.value
      .filter(
        (e) =>
          (e.target === sourceNode.id || e.source === targetNode.id) &&
          e.target !== e.source,
      )
      .map((e) => {
        const nodes = controls.helpers.edges.getConnectedNodes(e.id);
        return e.target === nodes.sourceNode.id
          ? controls.positions.get(nodes.targetNode.id)
          : controls.positions.get(nodes.sourceNode.id);
      })
      .filter(
        (point, index, self) =>
          index === self.findIndex((p) => p.x === point.x && p.y === point.y),
      ),
  );

  if (isSelfDirected) {
    return controls.shapes.shapes.circle({
      id: edge.id,
      at: {
        x:
          sourceNode.x + Math.cos(largestAngularSpaceBisector) * sourceNodeSize,
        y:
          sourceNode.y + Math.sin(largestAngularSpaceBisector) * sourceNodeSize,
      },
      radius: sourceNodeSize * 0.75,
      fillColor: styles.color,
      stroke: {
        color: styles.color,
        lineWidth: styles.width,
      },
    });
  }

  const textArea = {
    textBlock: {
      content: styles.text.content,
      fontSize: styles.text.size,
      fontWeight: styles.text.fontWeight,
      color: styles.text.color,
    },
  };

  if (isGraphDirected) {
    return controls.shapes.shapes.arrow({
      id: edge.id,
      start: edgeStart,
      end: edgeEnd,
      lineWidth: styles.width,
      fillColor: styles.color,
      textArea,
    });
  }

  return controls.shapes.shapes.line({
    id: edge.id,
    start: edgeStart,
    end: edgeEnd,
    lineWidth: styles.width,
    fillColor: styles.color,
    textArea,
  });
};
