import type { Coordinate } from '@shape/types/utility';
import tinycolor from 'tinycolor2';

/**
 * given a time/duration (in milliseconds) and a frame rate (in frames per second),
 * returns the number of steps needed to interpolate between two values.
 *
 * @param {number} durationMs in milliseconds
 * @param {number} frameRate in frames per second
 * @returns {number} the number of steps needed to interpolate between two values
 */
export const getFrameCountWithDuration = (
  durationMs: number,
  frameRate: number,
) => {
  const seconds = durationMs / 1000;
  return Math.floor(frameRate * seconds);
};

/**
 * gets an intermediate color value between two colors.
 *
 * @param colors Array of CSS color strings.
 * @param progress Number between 0 and 1.
 * @returns tinycolor instance representing the interpolated color.
 */
export const interpolateColors = (colors: string[], progress: number) => {
  if (colors.length < 2) {
    throw new Error('At least two colors are required for interpolation.');
  }

  const validColors = colors.map((color) => tinycolor(color));
  if (validColors.some((color) => !color.isValid())) {
    throw new Error('Invalid color provided in the list.');
  }

  const totalSteps = colors.length - 1;
  const scaledProgress = progress * totalSteps;
  const startIndex = Math.floor(scaledProgress);
  const endIndex = Math.min(startIndex + 1, colors.length - 1);

  const localProgress = scaledProgress - startIndex;

  const startRgb = validColors[startIndex].toRgb();
  const endRgb = validColors[endIndex].toRgb();

  const r = startRgb.r + (endRgb.r - startRgb.r) * localProgress;
  const g = startRgb.g + (endRgb.g - startRgb.g) * localProgress;
  const b = startRgb.b + (endRgb.b - startRgb.b) * localProgress;

  return tinycolor({ r: Math.round(r), g: Math.round(g), b: Math.round(b) });
};

export type InterpolateCoordinateOptions = {
  /**
   * the start coordinate pair
   */
  start: Coordinate;
  /**
   * the end coordinate pair
   */
  end: Coordinate;
  /**
   * the number of steps to interpolate between the start and end coordinates (inclusive).
   * must be an integer greater than 0
   */
  numberOfSteps: number;
  /**
   * the easing function to use for interpolation
   * @default "in-out"
   */
  easeFn?: EasingFunction | NamedEasingFunction;
};

const INTERPOLATE_COORDINATE_DEFAULTS = {
  easeFn: 'in-out',
} as const;

/**
 * interpolates between two coordinates using the specified easing function.
 *
 * @param options - interpolation options
 * @returns an array of interpolated coordinates
 *
 * @example
 * const interpolatedCoords = pointInterpolation({
 *  start: { x: 0, y: 0 },
 *  end: { x: 100, y: 50 },
 *  numberOfSteps: 5,
 *  animationEasing: "linear"
 * });
 *
 * console.log(interpolatedCoords);
 * // [{x: 20, y: 10},
 * // {x: 40, y: 20},
 * // {x: 60, y: 30},
 * // {x: 80, y: 40},
 * // {x: 100, y: 50}]
 */
export const interpolateCoordinates = (
  options: InterpolateCoordinateOptions,
) => {
  const { start, end, numberOfSteps, easeFn } = {
    ...INTERPOLATE_COORDINATE_DEFAULTS,
    ...options,
  };

  if (numberOfSteps < 1)
    throw new Error(
      `numberOfSteps must be greater than 0, got ${numberOfSteps}`,
    );
  if (!Number.isInteger(numberOfSteps))
    throw new Error(`numberOfSteps must be an integer, got ${numberOfSteps}`);

  const result: Coordinate[] = [];

  const easing = typeof easeFn === 'string' ? EASING_PRESETS[easeFn] : easeFn;

  for (let i = 1; i <= numberOfSteps; i++) {
    const progress = i / numberOfSteps;
    const easedProgress = easing(progress);

    const x = Math.round(start.x + (end.x - start.x) * easedProgress);
    const y = Math.round(start.y + (end.y - start.y) * easedProgress);

    result.push({ x, y });
  }

  return result;
};

export type InterpolateCoordinateOverTimeOptions = Omit<
  InterpolateCoordinateOptions,
  'numberOfSteps'
> & {
  /**
   * the duration of the interpolation in milliseconds
   * @default 1000 // (1 second)
   */
  durationMs?: number;
  /**
   * the frame rate of the interpolation in frames per second
   * @default 60
   */
  frameRate?: number;
};

const INTERPOLATE_COORDINATE_OVER_TIME_DEFAULTS = {
  durationMs: 1000,
  frameRate: 60,
} as const;

/**
 * an extension of `interpolateCoordinates` that calculates the number of steps
 * in the interpolation based on the given duration
 * (in milliseconds) and frame rate (in frames per second).
 *
 * @param options - interpolation options with `durationMs` and `frameRate`
 * @returns an array of interpolated coordinates such that the interpolation
 * takes `durationMs` milliseconds to run though at `frameRate` frames per second.
 */
export const interpolateCoordinatesOverTime = (
  options: InterpolateCoordinateOverTimeOptions,
) => {
  const { durationMs, frameRate } = {
    ...INTERPOLATE_COORDINATE_OVER_TIME_DEFAULTS,
    ...options,
  };

  const coords = interpolateCoordinates({
    ...options,
    numberOfSteps: getFrameCountWithDuration(durationMs, frameRate),
  });

  return {
    coords,
    /**
     * use this value in `setTimeout` or `setInterval` to ensure that the
     * interpolation runs at the desired frame rate without a hitch.
     */
    timePerFrameMs: Math.floor(durationMs / coords.length),
  };
};
