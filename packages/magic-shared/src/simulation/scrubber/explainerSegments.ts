import { nullThrows } from '@core/utils/assert';
import { MaybeGetter, getValue } from '@core/utils/maybeGetter/index';

import { GNode, Graph } from '../../graph/types.ts';
import { useNodeStyles } from '../../utilities/useNodeStyles.ts';
import { useNodeIdThemer } from '../../utilities/useNodeThemer.ts';
import { Explainer, ExplainerHighlight } from '../types.ts';

type ExplainerSegment = {
  id: string;
  text: MaybeGetter<string>;
  highlight: ExplainerHighlight | undefined;
};

const useNodeExplainerHighlight = (
  graph: Graph,
  id: GNode['id'],
): ExplainerHighlight => {
  const { themer } = useNodeIdThemer(graph, id);
  const { styles, dispose } = useNodeStyles(graph, id);
  return {
    onUnmounted: dispose,
    activate: themer.activate,
    deactivate: themer.deactivate,
    styles: () => ({
      backgroundColor: styles.value.border.color,
    }),
  };
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
      parts.push({
        id: crypto.randomUUID(),
        text: () => graph.nodeLabel.get(nodeId),
        highlight: useNodeExplainerHighlight(graph, nodeId),
      });
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
