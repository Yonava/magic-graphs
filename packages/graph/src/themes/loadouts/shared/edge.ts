import { getLargestAngularSpace } from '@magic/shapes/helpers';
import { TextArea } from '@magic/shapes/text/types';
import { GOLDEN_RATIO } from '@magic/utils/math';

import { GEdge, GNode } from '../../../types.ts';
import { GraphTheme, resolveThemeForEdge } from '../../index.ts';
import { GraphInterface } from '../../types.ts';
import { textDefaults } from './text.ts';

const WHITESPACE_BETWEEN_ARROW_TIP_AND_NODE_PX = 2;

// forked from graph helpers because graph helpers require BaseGraph instance and
// schematics are being created from inside the base graph https://github.com/Yonava/magic-graphs/issues/577
// TODO remove fork when PR for https://github.com/Yonava/magic-graphs/issues/574 lands
const getEdgesBetweenConnectedNodes =
  (graph: GraphInterface) => (nodeId1: GNode['id'], nodeId2: GNode['id']) => {
    const isConnecting = (edge: GEdge) => {
      const fromNode1ToNode2 = edge.from === nodeId1 && edge.to === nodeId2;
      const fromNode2ToNode1 = edge.from === nodeId2 && edge.to === nodeId1;
      return fromNode1ToNode2 || fromNode2ToNode1;
    };

    return graph.edges.value.filter(isConnecting);
  };

// TODO remove this fork as well! https://github.com/Yonava/magic-graphs/issues/577
const getConnectedNodes = (graph: GraphInterface) => (edgeId: GEdge['id']) => {
  const edge = graph.getEdge(edgeId);
  if (!edge) throw new Error(`Edge with ID ${edgeId} not found`);
  const fromNode = graph.getNode(edge.from);
  const toNode = graph.getNode(edge.to);
  if (!fromNode || !toNode) throw new Error('nodes not found');
  return { fromNode, toNode };
};

const edgeShape: GraphTheme['edge']['base']['shape'] = (edge, graph) => {
  const styles = resolveThemeForEdge(graph.getTheme, edge);
  const { isGraphDirected, isGraphWeighted } = graph.settings.value;

  const { fromNode, toNode } = getConnectedNodes(graph)(edge.id);
  const edgesAlongPath = getEdgesBetweenConnectedNodes(graph)(
    fromNode.id,
    toNode.id,
  );

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
        const { fromNode, toNode } = getConnectedNodes(graph)(e.id);
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
  text: ({ weight }: GEdge) => {
    return weight.toFraction();
  },
  width: 10,
  shape: edgeShape,
} as const;
