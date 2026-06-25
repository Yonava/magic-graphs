import type { MagicCanvasProps } from '@magic/canvas/types';
import { createGraph } from '@magic/create-graph/index';
import { CoreEdge, CoreNode } from '@magic/graph-core-infra/types';
import {
  CURSOR,
  CURSOR_FALLBACK,
} from '@magic/graph-plugins-shared/theme/cursor';
import { adjacencyLists } from '@magic/graph-plugins/adjacency-lists/index';
import { anchors } from '@magic/graph-plugins/anchors/index';
import { canvas } from '@magic/graph-plugins/canvas/index';
import type { Graph } from '@magic/graph-plugins/canvas/themes';
import { characteristics } from '@magic/graph-plugins/characteristics/index';
import { focus } from '@magic/graph-plugins/focus/index';
import { history } from '@magic/graph-plugins/history/index';
import { marquee } from '@magic/graph-plugins/marquee/index';
import { nodeDrag } from '@magic/graph-plugins/node-drag/index';
import { nodeLabel } from '@magic/graph-plugins/node-label/index';
import { transitionMatrix } from '@magic/graph-plugins/transition-matrix/index';
import type { GraphSettings } from '@magic/graph/settings/index';
import { getLargestAngularSpaceBisector } from '@magic/shapes/helpers';
import { TextArea } from '@magic/shapes/text/types';
import { nullThrows } from '@magic/utils/assert';
import colors from '@magic/utils/colors';
import { GOLDEN_RATIO } from '@magic/utils/math';

import { useInteractive } from './interactive/index.ts';
import { useShortcuts } from './shortcut/index.ts';

const WHITESPACE_BETWEEN_ARROW_TIP_AND_NODE_PX = 2;

const nodeShape = (node: CoreNode, graph: Graph) => {
  const nodePosition = nullThrows(
    graph.positions.get(node.id),
    `could not resolve position for node with id ${node.id}`,
  );

  return graph.shapes.circle({
    id: node.id,
    at: nodePosition,
    radius: graph.resolveToken('node.default.size', node, graph),
    fillColor: graph.resolveToken('node.default.color', node, graph),
    stroke: {
      color: graph.resolveToken('node.default.border.color', node, graph),
      lineWidth: graph.resolveToken('node.default.border.width', node, graph),
    },
    textArea: {
      color: colors.TRANSPARENT,
      textBlock: {
        content: graph.resolveToken('node.default.text.content', node, graph),
        fontSize: graph.resolveToken('node.default.text.size', node, graph),
        fontWeight: graph.resolveToken(
          'node.default.text.fontWeight',
          node,
          graph,
        ),
        color: graph.resolveToken('node.default.text.color', node, graph),
      },
    },
  });
};

const edgeShape = (edge: CoreEdge, graph: Graph) => {
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
    'node.default.border.width',
    sourceNode,
    graph,
  );
  const toNodeBorderWidth = graph.resolveToken(
    'node.default.border.width',
    targetNode,
    graph,
  );
  const fromNodeSize = graph.resolveToken(
    'node.default.size',
    sourceNode,
    graph,
  );
  const toNodeSize = graph.resolveToken('node.default.size', targetNode, graph);

  const width = graph.resolveToken('edge.default.width', edge, graph);
  const color = graph.resolveToken('edge.default.color', edge, graph);
  const text = graph.resolveToken('edge.default.text.content', edge, graph);
  const textSize = graph.resolveToken('edge.default.text.size', edge, graph);
  const textColor = graph.resolveToken('edge.default.text.color', edge, graph);
  const textFontWeight = graph.resolveToken(
    'edge.default.text.fontWeight',
    edge,
    graph,
  );
  const canvasColor = graph.resolveToken('canvas.color');

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

  const bidirectionalEdgeSpacing = Math.max(width * 1.2, 7);

  if (multipleEdgesInPath) {
    edgeStart.x += Math.cos(angle + Math.PI / 2) * bidirectionalEdgeSpacing;
    edgeStart.y += Math.sin(angle + Math.PI / 2) * bidirectionalEdgeSpacing;
    edgeEnd.x += Math.cos(angle + Math.PI / 2) * bidirectionalEdgeSpacing;
    edgeEnd.y += Math.sin(angle + Math.PI / 2) * bidirectionalEdgeSpacing;
  }

  const largestAngularSpaceBisector = getLargestAngularSpaceBisector(
    edgeStart,
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

  const textAreaOnEdge: TextArea = {
    color: 'none',
    activeColor: canvasColor,
    textBlock: {
      content: text,
      color: textColor,
      fontSize: textSize,
      fontWeight: textFontWeight,
    },
  };

  const textArea = isGraphWeighted ? textAreaOnEdge : undefined;

  const upDistance = (fromNodeSize + fromNodeBorderWidth) * GOLDEN_RATIO;
  const downDistance =
    upDistance -
    (fromNodeSize + fromNodeBorderWidth / 2) -
    WHITESPACE_BETWEEN_ARROW_TIP_AND_NODE_PX;

  if (isSelfDirected) {
    return graph.shapes.uturn({
      id: edge.id,
      spacing: width * 1.2,
      at: { x: sourceNode.x, y: sourceNode.y },
      upDistance,
      downDistance,
      rotation: largestAngularSpaceBisector,
      lineWidth: width,
      fillColor: color,
      textArea,
    });
  }

  const sumOfToAndFromNodeSize =
    fromNodeSize + fromNodeBorderWidth / 2 + toNodeSize + toNodeBorderWidth / 2;
  const distanceSquaredBetweenNodes =
    (sourceNode.x - targetNode.x) ** 2 + (sourceNode.y - targetNode.y) ** 2;
  const areNodesTouching =
    sumOfToAndFromNodeSize ** 2 > distanceSquaredBetweenNodes;

  if (areNodesTouching) return;

  if (!isGraphDirected) {
    return graph.shapes.line({
      id: edge.id,
      start: edgeStart,
      end: edgeEnd,
      lineWidth: width,
      fillColor: color,
      textArea,
    });
  }

  return graph.shapes.arrow({
    id: edge.id,
    start: edgeStart,
    end: edgeEnd,
    lineWidth: width,
    textOffsetFromCenter: (fromNodeSize + fromNodeBorderWidth / 2) / 2,
    fillColor: color,
    textArea,
  });
};

const createGraphWithPlugins = (
  magicCanvas: MagicCanvasProps,
  settings: Partial<GraphSettings> = {},
) => {
  const graph = createGraph({
    settings,
    plugins: [
      canvas(magicCanvas),
      history,
      focus,
      marquee,
      anchors,
      nodeDrag,
      nodeLabel,
      adjacencyLists,
      transitionMatrix,
      characteristics,
    ],
    themePresets: {
      light: {
        canvas: {
          'node.default.color': colors.GRAY_50,
          'node.default.border.color': colors.GRAY_800,
          'node.default.border.width': 8,
          'node.default.size': 35,
          'node.default.cursor': CURSOR.POINTER,
          'node.default.text.content': '?',
          'node.default.text.size': 24,
          'node.default.text.color': colors.GRAY_900,
          'node.default.text.fontWeight': 'bold',
          'node.default.shape': nodeShape,
          'edge.default.shape': edgeShape,
          'edge.default.color': colors.GRAY_800,
          'edge.default.width': 10,
          'edge.default.text.content': '?',
          'edge.default.text.size': 24,
          'edge.default.text.color': colors.GRAY_900,
          'edge.default.text.fontWeight': 'bold',
          'canvas.color': colors.GRAY_200,
          'canvas.patternColor': colors.GRAY_500,
          'canvas.cursor': CURSOR_FALLBACK,
        },
        focus: {
          'node.focus.color': colors.BLUE_100,
          'node.focus.border.color': colors.BLUE_600,
          'node.focus.border.width': 8,
          'node.focus.size': 35,
          'node.focus.cursor': CURSOR.POINTER,
          'node.focus.text.content': '?',
          'node.focus.shape': nodeShape,
          'edge.focus.shape': edgeShape,
          'node.focus.text.size': 24,
          'node.focus.text.color': colors.GRAY_900,
          'node.focus.text.fontWeight': 'bold',
          'edge.focus.color': colors.BLUE_600,
          'edge.focus.width': 10,
          'edge.focus.text.content': '?',
          'edge.focus.text.size': 24,
          'edge.focus.text.color': colors.GRAY_900,
          'edge.focus.text.fontWeight': 'bold',
        },
        marquee: {
          'marquee.drag.color': colors.BLUE_300 + '15',
          'marquee.drag.border.color': colors.BLUE_500,
          'marquee.drag.border.width': 1,
          'marquee.selection.color': colors.BLUE_700 + '05',
          'marquee.selection.border.color': colors.BLUE_700,
          'marquee.selection.border.width': 1,
          'marquee.selection.cursor': CURSOR.POINTER,
        },
        anchors: {
          'anchors.default.color': colors.BLACK,
          'anchors.default.radius': Math.ceil(Math.sqrt(35) * 2),
          'anchors.default.cursor': CURSOR.GRAB,
          'anchors.parentFocused.color': colors.BLUE_900,
          'anchors.parentFocused.radius': Math.ceil(Math.sqrt(35) * 2),
          'anchors.parentFocused.cursor': CURSOR.GRAB,
          'anchors.edge.preview.default.color': colors.BLACK,
          'anchors.edge.preview.default.width': 10,
          'anchors.edge.preview.parentFocused.color': colors.BLACK,
          'anchors.edge.preview.parentFocused.width': 10,
        },
      },
    },
  });

  return graph;
};

export type GraphWithPlugins = ReturnType<typeof createGraphWithPlugins>;
export type GNode = ReturnType<GraphWithPlugins['getNode']>;
export type GEdge = ReturnType<GraphWithPlugins['getEdge']>;

/**
 * a hook brimming with tools for creating and managing graphs bringing
 * light and joy to the world
 *
 * @param canvas the HTML canvas element to render the graph onto
 * @param settings default settings for the graph
 * @returns a graph instance with APIs for managing the graph
 */
export const useGraph = (
  canvas: MagicCanvasProps,
  settings: Partial<GraphSettings> = {},
) => {
  const graph = createGraphWithPlugins(canvas, settings);
  const shortcut = useShortcuts(graph);

  useInteractive(graph);

  return {
    ...graph,
    shortcut,
  };
};
