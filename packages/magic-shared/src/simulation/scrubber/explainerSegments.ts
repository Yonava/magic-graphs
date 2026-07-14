import { nullThrows } from '@core/utils/assert';

import { Explainer, ExplainerHighlight } from '../types.ts';

type ExplainerSegment = {
  text: string;
  highlight: ExplainerHighlight | undefined;
};

export const explainerSegments = (
  explainer: Explainer | undefined,
): ExplainerSegment[] => {
  if (!explainer) return [];

  const { content: text, highlights } = explainer;

  const parts: ExplainerSegment[] = [];
  let lastIndex = 0;
  let highlightIndex = 0;

  const bracketPattern = /\[([^\]]*)\]/g;
  const matches = text.matchAll(bracketPattern);

  for (const match of matches) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      parts.push({
        text: text.slice(lastIndex, index),
        highlight: undefined,
      });
    }
    parts.push({
      text: match[1],
      highlight: nullThrows(
        highlights[highlightIndex++],
        `explainer content has more [bracketed] segments than highlights (expected highlights[${highlightIndex}])`,
      ),
    });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push({
      text: text.slice(lastIndex),
      highlight: undefined,
    });
  }

  return parts;
};
