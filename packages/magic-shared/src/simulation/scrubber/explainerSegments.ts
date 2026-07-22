import { nullThrows } from '@core/utils/assert';
import { MaybeGetter, getValue } from '@core/utils/maybeGetter/index';

import { Graph } from '../../graph/types.ts';
import { Explainer, ExplainerHighlight } from '../types.ts';
import { useNodeIdPart } from './useNodeIdPart.ts';

export type ExplainerSegment = {
  id: string;
  text: MaybeGetter<string>;
  highlight: ExplainerHighlight | undefined;
};

export const explainerSegments = (
  graph: Graph,
  explainer: Explainer | undefined,
): ExplainerSegment[] => {
  if (!explainer) return [];

  const { content: text, highlights } = explainer;

  const textValue = getValue(text);
  const highlightsValue = getValue(highlights) ?? [];

  const parts: ExplainerSegment[] = [];
  let lastIndex = 0;
  let highlightIndex = 0;

  const segmentPattern = /\[([^\]]*)\]|\{([^}]*)\}/g;
  const matches = textValue.matchAll(segmentPattern);

  for (const match of matches) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      parts.push({
        id: crypto.randomUUID(),
        text: textValue.slice(lastIndex, index),
        highlight: undefined,
      });
    }

    const [, bracketContent, nodeId] = match;

    if (nodeId !== undefined) {
      const nodeIdPart = useNodeIdPart(graph, nodeId);
      parts.push(nodeIdPart);
    } else {
      parts.push({
        id: crypto.randomUUID(),
        text: bracketContent,
        highlight: nullThrows(
          highlightsValue[highlightIndex++],
          `explainer content has more [bracketed] segments than highlights (expected highlights[${highlightIndex}])`,
        ),
      });
    }

    lastIndex = index + match[0].length;
  }

  if (lastIndex < textValue.length) {
    parts.push({
      id: crypto.randomUUID(),
      text: textValue.slice(lastIndex),
      highlight: undefined,
    });
  }

  return parts;
};
