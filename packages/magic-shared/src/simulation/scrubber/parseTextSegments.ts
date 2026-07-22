type BracketType = 'curly' | 'square';

export type TextSegment = {
  bracketType: BracketType | undefined;
  text: string;
};

export const parseTextSegments = (str: string): TextSegment[] => {
  const pattern = /\{([^}]*)\}|\[([^\]]*)\]|([^{}[\]]+)/g;

  return [...str.matchAll(pattern)].map((m) => {
    const [, curlyContent, squareContent, plainText] = m;
    if (curlyContent !== undefined) {
      return { bracketType: 'curly', text: curlyContent };
    }
    if (squareContent !== undefined) {
      return { bracketType: 'square', text: squareContent };
    }
    return { bracketType: undefined, text: plainText };
  });
};
