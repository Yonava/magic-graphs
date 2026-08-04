import { getLargestAngularSpaceBisector } from '@canvas/primitives/helpers';
import { LineSchema } from '@canvas/primitives/shapes/line/types';
import { TextArea } from '@canvas/primitives/text/types';
import { WithId } from '@canvas/primitives/types/index';
import { GOLDEN_RATIO } from '@core/utils/math';

import {
  createEdgeStyleResolver,
  createNodeStyleResolver,
} from './resolvers.ts';
import {
  CreateEdgeRenderFunction,
  DefaultEdgeRenderOptions,
  EdgeRenderOptionsSource,
} from './types.ts';

const WHITESPACE_BETWEEN_ARROW_TIP_AND_NODE_PX = 2;

/**
 * the single definition of how a graph answers every edge render option that does not depend
 * on topology. spread it and supply {@link EdgeTopologyOptions} to build a renderer that
 * differs from the default only where it means to.
 */
export const createDefaultEdgeRenderOptions = (
  source: EdgeRenderOptionsSource,
): DefaultEdgeRenderOptions => ({
  shapes: source.canvas.shapes,
  resolveToken: source.resolveToken,
  directed: source.metadata.directed,
  labelled: source.metadata.weighted,
  labelTextInputColor: () => source.canvas.theme._resolveToken('canvas.color'),
});

export const createEdgeRenderFunction: CreateEdgeRenderFunction = ({
  resolveToken,
  shapes,
  directed,
  labelled,
  labelTextInputColor,
  parallelEdgeCount,
  neighborPositions,
}) => {
  const resolveEdgeStyles = createEdgeStyleResolver(resolveToken);
  const resolveNodeStyles = createNodeStyleResolver(resolveToken);
  return (edge) => {
    const styles = resolveEdgeStyles({
      id: edge.id,
      source: edge.source.id,
      target: edge.target.id,
    });

    const sourceNode = {
      ...edge.source,
      styles: resolveNodeStyles(edge.source),
    };
    const targetNode = {
      ...edge.target,
      styles: resolveNodeStyles(edge.target),
    };

    const multipleEdgesInPath = parallelEdgeCount(edge) > 1;

    const angle = Math.atan2(
      targetNode.position.y - sourceNode.position.y,
      targetNode.position.x - sourceNode.position.x,
    );

    const arrowHeadSpacingAwayFromNode =
      targetNode.styles.border.width / 2 +
      WHITESPACE_BETWEEN_ARROW_TIP_AND_NODE_PX;

    const arrowDrawOffset = {
      x:
        (targetNode.styles.size + arrowHeadSpacingAwayFromNode) *
        Math.cos(angle),
      y:
        (targetNode.styles.size + arrowHeadSpacingAwayFromNode) *
        Math.sin(angle),
    };

    const edgeStart = {
      x: sourceNode.position.x,
      y: sourceNode.position.y,
    };

    const edgeEnd = {
      x: targetNode.position.x - (directed ? arrowDrawOffset.x : 0),
      y: targetNode.position.y - (directed ? arrowDrawOffset.y : 0),
    };

    const bidirectionalEdgeSpacing = Math.max(styles.width * 1.2, 7);

    if (multipleEdgesInPath) {
      edgeStart.x += Math.cos(angle + Math.PI / 2) * bidirectionalEdgeSpacing;
      edgeStart.y += Math.sin(angle + Math.PI / 2) * bidirectionalEdgeSpacing;
      edgeEnd.x += Math.cos(angle + Math.PI / 2) * bidirectionalEdgeSpacing;
      edgeEnd.y += Math.sin(angle + Math.PI / 2) * bidirectionalEdgeSpacing;
    }

    const textArea: TextArea | undefined = labelled
      ? {
          color: 'none',
          activeColor: labelTextInputColor(edge),
          textBlock: styles.text,
        }
      : undefined;

    const isSelfDirected = targetNode.id === sourceNode.id;

    const sourceNodeGirth =
      sourceNode.styles.size + sourceNode.styles.border.width / 2;

    if (isSelfDirected) {
      const upDistance =
        (sourceNode.styles.size + sourceNode.styles.border.width) *
        GOLDEN_RATIO;
      const downDistance =
        upDistance - sourceNodeGirth - WHITESPACE_BETWEEN_ARROW_TIP_AND_NODE_PX;

      return shapes.uturn({
        id: edge.id,
        spacing: styles.width * 1.2,
        at: sourceNode.position,
        upDistance,
        downDistance,
        // point the loop into whichever gap between neighbors is widest
        rotation: getLargestAngularSpaceBisector(
          edgeStart,
          neighborPositions(edge),
        ),
        lineWidth: styles.width,
        fillColor: styles.color,
        textArea,
      });
    }

    const lineOptions: WithId<LineSchema> = {
      id: edge.id,
      start: edgeStart,
      end: edgeEnd,
      lineWidth: styles.width,
      fillColor: styles.color,
      textArea,
    };

    if (directed) {
      return shapes.arrow({
        textOffsetFromCenter: sourceNodeGirth / 2,
        ...lineOptions,
      });
    }

    return shapes.line(lineOptions);
  };
};
