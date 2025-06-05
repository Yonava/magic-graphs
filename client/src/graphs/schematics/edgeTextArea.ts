import type { TextArea } from '@shape/types/utility';
import tinycolor from 'tinycolor2';
import { getMapper } from './utils';
import { SEQ } from './edgeSeq';

const opacityAdjustedTextArea =
  (opacity: number) => (textArea: TextArea) => {
    const { color: bgColor, textBlock } = textArea;
    const { color: textColor } = textBlock

    if (!bgColor || !textColor) return textArea;

    const adjustOpacity = (color: string) =>
      tinycolor(color).setAlpha(opacity).toRgbString();

    const bgColorWithOpacity = adjustOpacity(bgColor);
    const textColorWithOpacity = adjustOpacity(textColor);

    return {
      ...textArea,
      color: bgColorWithOpacity,
      text: {
        ...textBlock,
        color: textColorWithOpacity,
      },
    };
  };

export const animateInTextArea =
  (progress: number) => (textArea: TextArea | undefined) => {
    if (!textArea) return undefined;

    const mapper = getMapper(...SEQ.IN.TEXT_AREA);
    const opacity = mapper(progress);

    const adjustOpacityOfTextArea = opacityAdjustedTextArea(opacity);
    return adjustOpacityOfTextArea(textArea);
  };

export const animateOutTextArea =
  (progress: number) => (textArea: TextArea | undefined) => {
    if (!textArea) return undefined;

    const mapper = getMapper(0, 1);
    const opacity = 1 - mapper(progress);

    const { color: textColor } = textArea.textBlock;
    if (!textColor) return textArea;

    const adjustOpacity = (color: string) =>
      tinycolor(color).setAlpha(opacity).toRgbString();

    const textColorWithOpacity = adjustOpacity(textColor);

    return {
      ...textArea,
      text: {
        ...textArea.textBlock,
        color: textColorWithOpacity,
      },
    };
  };
