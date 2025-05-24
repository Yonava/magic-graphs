import type { GEdge, SchemaItem } from '@graph/types';
import { getConnectedNodes, getEdgesAlongPath } from '@graph/helpers';
import { getLargestAngularSpace } from '@shape/helpers';
import type { BaseGraph } from '@graph/base';
import { GOLDEN_RATIO } from '@utils/math';
import { edgeArrow } from './edgeArrow';
import { edgeLine } from './edgeLine';
import { edgeUTurn } from './edgeUturn';

const WHITESPACE_BETWEEN_ARROW_TIP_AND_NODE = 2;

type PropsNeededFromGraph =
  | 'shapes'
  | 'edges'
  | 'getNode'
  | 'getEdge'
  | 'getTheme'
  | 'settings'
  | 'animationController';

export const getEdgeSchematic = (
  edge: GEdge,
  graph: Pick<BaseGraph, PropsNeededFromGraph>,
): Omit<SchemaItem, 'priority'> | undefined => {
  const { displayEdgeLabels, isGraphDirected } = graph.settings.value;

  const arrow = edgeArrow(graph);
  const line = edgeLine(graph);
  const uturn = edgeUTurn(graph);

  const [from, to] = getConnectedNodes(edge.id, graph);
  const edgesAlongPath = getEdgesAlongPath(from.id, to.id, graph);

  const multipleEdgesInPath = edgesAlongPath.length > 1;
  const isSelfDirected = to === from;

  const fromNodeBorderWidth = graph.getTheme('nodeBorderWidth', from);
  const toNodeBorderWidth = graph.getTheme('nodeBorderWidth', to);

  const fromNodeSize = graph.getTheme('nodeSize', from);
  const toNodeSize = graph.getTheme('nodeSize', to);

  const angle = Math.atan2(to.y - from.y, to.x - from.x);

  const arrowHeadSpacingAwayFromNode =
    toNodeBorderWidth / 2 + WHITESPACE_BETWEEN_ARROW_TIP_AND_NODE;
  const arrowDrawOffset = {
    x: (toNodeSize + arrowHeadSpacingAwayFromNode) * Math.cos(angle),
    y: (toNodeSize + arrowHeadSpacingAwayFromNode) * Math.sin(angle),
  };

  const edgeStart = { x: from.x, y: from.y };
  const edgeEnd = {
    x: to.x - (isGraphDirected ? arrowDrawOffset.x : 0),
    y: to.y - (isGraphDirected ? arrowDrawOffset.y : 0),
  };

  const edgeWidth = graph.getTheme('edgeWidth', edge);

  /**
   * the number of pixels we space out the edges if there are multiple edges
   * in a path between two nodes
   */
  const bidirectionalEdgeSpacing = Math.max(edgeWidth * 1.2, 7);

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
      .filter((e) => (e.from === from.id || e.to === to.id) && e.from !== e.to)
      .map((e) => {
        const [fromNode, toNode] = getConnectedNodes(e.id, graph);
        return from.id === fromNode.id ? toNode : fromNode;
      })
      .filter(
        (point, index, self) =>
          index === self.findIndex((p) => p.x === point.x && p.y === point.y),
      ),
  );

  const color = graph.getTheme('edgeColor', edge);
  const edgeTextColor = graph.getTheme('edgeTextColor', edge);

  const graphBgColor = graph.getTheme('graphBgColor');

  const edgeText = graph.getTheme('edgeText', edge);
  const edgeTextSize = graph.getTheme('edgeTextSize', edge);
  const edgeTextFontWeight = graph.getTheme('edgeTextFontWeight', edge);

  const textAreaOnEdge = {
    color: graphBgColor,
    activeColor: graphBgColor,
    text: {
      content: edgeText,
      color: edgeTextColor,
      fontSize: edgeTextSize,
      fontWeight: edgeTextFontWeight,
    },
  };

  const textArea = displayEdgeLabels ? textAreaOnEdge : undefined;

  const upDistance = (fromNodeSize + fromNodeBorderWidth) * GOLDEN_RATIO;
  const downDistance =
    upDistance -
    (fromNodeSize + fromNodeBorderWidth / 2) -
    WHITESPACE_BETWEEN_ARROW_TIP_AND_NODE;

  if (isSelfDirected) {
    const shape = uturn({
      spacing: edgeWidth * 1.2,
      at: { x: from.x, y: from.y },
      upDistance,
      downDistance,
      rotation: largestAngularSpace,
      lineWidth: edgeWidth,
      color,
      textArea,
    });

    return {
      shape,
      id: edge.id,
      graphType: 'edge',
    };
  }

  const sumOfToAndFromNodeSize =
    fromNodeSize + fromNodeBorderWidth / 2 + toNodeSize + toNodeBorderWidth / 2;
  const distanceSquaredBetweenNodes =
    (from.x - to.x) ** 2 + (from.y - to.y) ** 2;
  const areNodesTouching =
    sumOfToAndFromNodeSize ** 2 > distanceSquaredBetweenNodes;

  // prevents edges from rendering if the connecting nodes are touching
  if (areNodesTouching) return;

  if (!isGraphDirected) {
    const shape = line({
      id: edge.id,
      start: edgeStart,
      end: edgeEnd,
      width: edgeWidth,
      color,
      textArea,
    });

    return {
      shape,
      id: edge.id,
      graphType: 'edge',
    };
  }

  // const edgeTextAdjustment = fromNodeSize >= 50 ? 0.9 : (fromNodeSize >= 25 ? 1 : 1.3)

  const shape = arrow({
    id: edge.id,
    start: edgeStart,
    end: edgeEnd,
    width: edgeWidth,
    textOffsetFromCenter: (fromNodeSize + fromNodeBorderWidth / 2) / 2,
    color,
    textArea,
  });

  return {
    shape,
    id: edge.id,
    graphType: 'edge',
  };
};
