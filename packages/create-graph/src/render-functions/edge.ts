import { CoreEdge } from '@magic/graph-core-infra/types';
import { CompoundTokenResolver } from '@magic/graph-plugins-shared/computed-tokens/createComputedTokenResolver';
import { CanvasControls } from '@magic/graph-plugins/canvas/types';
import { CoreControls } from '@magic/graph/core/types';
import { getLargestAngularSpaceBisector } from '@magic/shapes/helpers';
import { Shape } from '@magic/shapes/types/index';
import { nullThrows } from '@magic/utils/assert';
import { GOLDEN_RATIO } from '@magic/utils/math';

const WHITESPACE_BETWEEN_ARROW_TIP_AND_NODE_PX = 2;

type Props = {
  resolver: CompoundTokenResolver;
  edge: CoreEdge;
  controls: CoreControls & { canvas: CanvasControls };
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

  const { isGraphDirected, isGraphWeighted } = controls.settings.value;

  const fromNodeSize = resolver('node.size', rawSourceNode);
  const fromNodeBorderWidth = resolver('node.border.width', rawSourceNode);
  const toNodeSize = resolver('node.size', rawTargetNode);
  const toNodeBorderWidth = resolver('node.border.width', rawTargetNode);

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

  const arrowHeadSpacingAwayFromNode =
    toNodeBorderWidth / 2 + WHITESPACE_BETWEEN_ARROW_TIP_AND_NODE_PX;

  const arrowDrawOffset = {
    x: (toNodeSize + arrowHeadSpacingAwayFromNode) * Math.cos(angle),
    y: (toNodeSize + arrowHeadSpacingAwayFromNode) * Math.sin(angle),
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
    /**
     * 1. filter to remove self-referencing edges
     * 2. map to { x, y } format
     * 3. filter duplicates — prevents bi-directional edges from causing angle issues when no other edges are present
     */
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

  const textArea = isGraphWeighted
    ? {
        color: 'none' as const,
        activeColor: controls.canvas.theme._resolveToken('canvas.color'),
        textBlock: {
          content: styles.text.content,
          color: styles.text.color,
          fontSize: styles.text.size,
          fontWeight: styles.text.fontWeight,
        },
      }
    : undefined;

  if (isSelfDirected) {
    const upDistance = (fromNodeSize + fromNodeBorderWidth) * GOLDEN_RATIO;
    const downDistance =
      upDistance -
      (fromNodeSize + fromNodeBorderWidth / 2) -
      WHITESPACE_BETWEEN_ARROW_TIP_AND_NODE_PX;

    return controls.canvas.shapes.shapes.uturn({
      id: edge.id,
      spacing: styles.width * 1.2,
      at: { x: sourceNode.x, y: sourceNode.y },
      upDistance,
      downDistance,
      rotation: largestAngularSpaceBisector,
      lineWidth: styles.width,
      fillColor: styles.color,
      textArea,
    });
  }

  const sumOfToAndFromNodeSize =
    fromNodeSize + fromNodeBorderWidth / 2 + toNodeSize + toNodeBorderWidth / 2;
  const distanceSquaredBetweenNodes =
    (sourceNode.x - targetNode.x) ** 2 + (sourceNode.y - targetNode.y) ** 2;
  const areNodesTouching =
    sumOfToAndFromNodeSize ** 2 > distanceSquaredBetweenNodes;

  // prevents edges from rendering when connecting nodes are overlapping
  if (areNodesTouching) return undefined;

  if (!isGraphDirected) {
    return controls.canvas.shapes.shapes.line({
      id: edge.id,
      start: edgeStart,
      end: edgeEnd,
      lineWidth: styles.width,
      fillColor: styles.color,
      textArea,
    });
  }

  return controls.canvas.shapes.shapes.arrow({
    id: edge.id,
    start: edgeStart,
    end: edgeEnd,
    lineWidth: styles.width,
    textOffsetFromCenter: (fromNodeSize + fromNodeBorderWidth / 2) / 2,
    fillColor: styles.color,
    textArea,
  });
};
