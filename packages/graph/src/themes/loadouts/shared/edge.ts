import { getLargestAngularSpace } from '@magic/shapes/helpers';
import { TextArea } from '@magic/shapes/text/types';
import { GOLDEN_RATIO } from '@magic/utils/math';

import { GraphTheme, resolveThemeForEdge } from '../..';
import { getConnectedNodes, getEdgesAlongPath } from '../../../helpers';
import { GEdge } from '../../../types';
import { textDefaults } from './text';

const WHITESPACE_BETWEEN_ARROW_TIP_AND_NODE_PX = 2;

const edgeShape: GraphTheme['edge']['base']['shape'] = (edge, graph) => {
  const styles = resolveThemeForEdge(graph.getTheme, edge);
  const { displayEdgeLabels, isGraphDirected } = graph.settings.value;

  const [fromNode, toNode] = getConnectedNodes(edge.id, graph);
  const edgesAlongPath = getEdgesAlongPath(fromNode.id, toNode.id, graph);

  const multipleEdgesInPath = edgesAlongPath.length > 1;
  const isSelfDirected = toNode.id === fromNode.id;

  const fromNodeBorderWidth = graph.getTheme('node.base.borderWidth', fromNode);
  const toNodeBorderWidth = graph.getTheme('node.base.borderWidth', toNode);

  const fromNodeSize = graph.getTheme('node.base.size', fromNode);
  const toNodeSize = graph.getTheme('node.base.size', toNode);

  const angle = Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x);

  const arrowHeadSpacingAwayFromNode =
    toNodeBorderWidth / 2 + WHITESPACE_BETWEEN_ARROW_TIP_AND_NODE_PX;
  const arrowDrawOffset = {
    x: (toNodeSize + arrowHeadSpacingAwayFromNode) * Math.cos(angle),
    y: (toNodeSize + arrowHeadSpacingAwayFromNode) * Math.sin(angle),
  };

  const edgeStart = { x: fromNode.x, y: fromNode.y };
  const edgeEnd = {
    x: toNode.x - (isGraphDirected ? arrowDrawOffset.x : 0),
    y: toNode.y - (isGraphDirected ? arrowDrawOffset.y : 0),
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

  const largestAngularSpace = getLargestAngularSpace(
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
          (e.from === fromNode.id || e.to === toNode.id) && e.from !== e.to,
      )
      .map((e) => {
        const [fromNode, toNode] = getConnectedNodes(e.id, graph);
        return fromNode.id === fromNode.id ? toNode : fromNode;
      })
      .filter(
        (point, index, self) =>
          index === self.findIndex((p) => p.x === point.x && p.y === point.y),
      ),
  );

  const graphColor = graph.getTheme('graph.color');

  const textAreaOnEdge: TextArea = {
    color: graphColor,
    activeColor: graphColor,
    textBlock: {
      content: styles.text,
      color: styles.textColor,
      fontSize: styles.textSize,
      fontWeight: styles.textFontWeight,
    },
  };

  const textArea = displayEdgeLabels ? textAreaOnEdge : undefined;

  const upDistance = (fromNodeSize + fromNodeBorderWidth) * GOLDEN_RATIO;
  const downDistance =
    upDistance -
    (fromNodeSize + fromNodeBorderWidth / 2) -
    WHITESPACE_BETWEEN_ARROW_TIP_AND_NODE_PX;

  if (isSelfDirected) {
    const shape = graph.shapes.uturn({
      id: edge.id,
      spacing: styles.width * 1.2,
      at: { x: fromNode.x, y: fromNode.y },
      upDistance,
      downDistance,
      rotation: largestAngularSpace,
      lineWidth: styles.width,
      fillColor: styles.color,
      textArea,
    });

    return shape;
  }

  const sumOfToAndFromNodeSize =
    fromNodeSize + fromNodeBorderWidth / 2 + toNodeSize + toNodeBorderWidth / 2;
  const distanceSquaredBetweenNodes =
    (fromNode.x - toNode.x) ** 2 + (fromNode.y - toNode.y) ** 2;
  const areNodesTouching =
    sumOfToAndFromNodeSize ** 2 > distanceSquaredBetweenNodes;

  // prevents edges from rendering if the connecting nodes are touching
  if (areNodesTouching) return;

  if (!isGraphDirected) {
    const shape = graph.shapes.line({
      id: edge.id,
      start: edgeStart,
      end: edgeEnd,
      lineWidth: styles.width,
      fillColor: styles.color,
      textArea,
    });

    return shape;
  }

  const shape = graph.shapes.arrow({
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
  text: ({ label }: GEdge) => label,
  width: 10,
  shape: edgeShape,
} as const;
