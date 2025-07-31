import type { Color } from '@utils/colors';
import gsap from 'gsap';
import tinycolor from 'tinycolor2';

const { interpolate } = gsap.utils;

type Options = {
  /**
   * the range of numbers to interpolate between.
   */
  range: [number, number];
  /**
   * the range of colors to interpolate between.
   * if only a single color is provided, the color will be interpolated between the provided color
   * and a darker version of the color.
   */
  color: Color | [Color, Color];
};

export const numberToColor = (options: Options) => {
  const [min, max] = options.range;
  const startColor = Array.isArray(options.color)
    ? options.color[0]
    : options.color;
  const endColor = Array.isArray(options.color)
    ? options.color[1]
    : tinycolor(options.color).darken(50).toString();

  const getColor = interpolate(startColor, endColor);

  return (number: number) => {
    const t = (number - min) / (max - min);
    if (t < 0) return startColor;
    if (t > 1) return endColor;
    return getColor(t);
  };
};
