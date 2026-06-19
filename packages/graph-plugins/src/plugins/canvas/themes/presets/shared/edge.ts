import { CoreEdge } from '@magic/graph/types';
import { getLargestAngularSpaceBisector } from '@magic/shapes/helpers';
import { TextArea } from '@magic/shapes/text/types';
import { GOLDEN_RATIO } from '@magic/utils/math';

import { GraphTheme, resolveEdgeStyles } from '../../index.ts';
import { GraphInterface } from '../../types.ts';
import { textDefaults } from './text.ts';

const WHITESPACE_BETWEEN_ARROW_TIP_AND_NODE_PX = 2;

const edgeShape: GraphTheme['edge']['default']['shape'] = (edge, graph) => {
  const styles = resolveEdgeStyles(graph.resolveToken, edge);
  const { isGraphDirected, isGraphWeighted } = graph.settings.value;

  const { sourceNode: rawSourceNode, targetNode: rawTargetNode } =
    graph.helpers.edges.getConnectedNodes(edge.id);

  const sourceNode = {
    ...rawSourceNode,
    ...graph.positions.get(rawSourceNode.id),
  } as const;

  const targetNode = {
    ...rawTargetNode,
    ...graph.positions.get(rawTargetNode.id),
  } as const;

  const edgesAlongPath = graph.helpers.nodes.getEdgesBetweenConnectedNodes(
    sourceNode.id,
    targetNode.id,
  );

  const multipleEdgesInPath = edgesAlongPath.length > 1;
  const isSelfDirected = targetNode.id === sourceNode.id;

  const fromNodeBorderWidth = graph.resolveToken(
    'node.default.borderWidth',
    sourceNode,
  );
  const toNodeBorderWidth = graph.resolveToken(
    'node.default.borderWidth',
    targetNode,
  );

  const fromNodeSize = graph.resolveToken('node.default.size', sourceNode);
  const toNodeSize = graph.resolveToken('node.default.size', targetNode);

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

  /**
   * the number of pixels we space out the edges if there are multiple edges
   * in a path between two nodes
   */
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
     * 1. Filter to remove self-referencing edge
     * 2. Map to convert to { x, y } format
     * 3. Filter to remove duplicates. Prevents bi-directional edges
     *  from causing angle issues when no other edges are present
     */
    graph.edges.value
      .filter(
        (e) =>
          (e.target === sourceNode.id || e.source === targetNode.id) &&
          e.target !== e.source,
      )
      .map((e) => {
        const nodes = graph.helpers.edges.getConnectedNodes(e.id);
        return e.target === nodes.sourceNode.id
          ? graph.positions.get(nodes.targetNode.id)
          : graph.positions.get(nodes.sourceNode.id);
      })
      .filter(
        (point, index, self) =>
          index === self.findIndex((p) => p.x === point.x && p.y === point.y),
      ),
  );

  const canvasColor = graph.resolveToken('canvas.color');

  const textAreaOnEdge: TextArea = {
    color: 'none',
    activeColor: canvasColor,
    textBlock: {
      content: styles.text,
      color: styles.textColor,
      fontSize: styles.textSize,
      fontWeight: styles.textFontWeight,
    },
  };

  const textArea = isGraphWeighted ? textAreaOnEdge : undefined;

  const upDistance = (fromNodeSize + fromNodeBorderWidth) * GOLDEN_RATIO;
  const downDistance =
    upDistance -
    (fromNodeSize + fromNodeBorderWidth / 2) -
    WHITESPACE_BETWEEN_ARROW_TIP_AND_NODE_PX;

  if (isSelfDirected) {
    const shape = graph.shapes.shapes.uturn({
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

    return shape;
  }

  const sumOfToAndFromNodeSize =
    fromNodeSize + fromNodeBorderWidth / 2 + toNodeSize + toNodeBorderWidth / 2;
  const distanceSquaredBetweenNodes =
    (sourceNode.x - targetNode.x) ** 2 + (sourceNode.y - targetNode.y) ** 2;
  const areNodesTouching =
    sumOfToAndFromNodeSize ** 2 > distanceSquaredBetweenNodes;

  // prevents edges from rendering if the connecting nodes are touching
  if (areNodesTouching) return;

  if (!isGraphDirected) {
    const shape = graph.shapes.shapes.line({
      id: edge.id,
      start: edgeStart,
      end: edgeEnd,
      lineWidth: styles.width,
      fillColor: styles.color,
      textArea,
    });

    return shape;
  }

  const shape = graph.shapes.shapes.arrow({
    id: edge.id,
    start: edgeStart,
    end: edgeEnd,
    lineWidth: styles.width,
    textOffsetFromCenter: (fromNodeSize + fromNodeBorderWidth / 2) / 2,
    fillColor: styles.color,
    textArea,
  });

  return shape;
};

export const edgeShared = {
  ...textDefaults,
  text: '?',
  width: 10,
  shape: edgeShape,
} as const;
