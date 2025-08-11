import {
  type EasingFunction,
  type EasingOption,
  easingOptionToFunction,
} from '@shape/animation/easing';
import {
  interpolateColor,
  isColorString,
} from '@shape/animation/interpolation/color';
import { interpolateCoordinate } from '@shape/animation/interpolation/coordinate';
import { interpolateNumber } from '@shape/animation/interpolation/number';
import { interpolateTextArea } from '@shape/animation/interpolation/textArea';
import type { AnimationKeyframe } from '@shape/animation/interpolation/types';
import { resolveTextArea } from '@shape/text/defaults';
import type { TextArea } from '@shape/text/types';
import type { EverySchemaPropName, ShapeName } from '@shape/types';
import type { Coordinate } from '@shape/types/utility';
import type { Color } from '@utils/colors';
import { isPlainObject } from '@utils/deepMerge';

import type {
  ImperativeTrack,
  Timeline,
  TimelinePlaybackDelay,
  TimelinePlaybackDuration,
} from './define';

/**
 * @param schema the non-altered schema of the shape being animated
 * @param progress value between 0 and 1. See {@link NumberKeyframe.progress}
 */
type AnimationFunction = (schema: any, progress: number) => any;

export type CompiledTimeline = {
  /**
   * maps schema properties to their animation functions
   */
  properties: Record<string, AnimationFunction>;
  /**
   * the shapes that this animated timeline is valid for
   */
  validShapes: Set<ShapeName>;
} & TimelinePlaybackDuration &
  Required<TimelinePlaybackDelay>;

/**
 * property name on schema (radius, rotation, lineWidth etc) to
 * keyframes of either a custom getter function or the value itself
 */
type PropToAnimationKeyframe = Partial<
  Record<EverySchemaPropName, AnimationKeyframe<any>[]>
>;

// TODO
// eventually when we get better object/non-primitive runtime validation
// options like zod, we should use that instead of a hardcoded set of strings

// schema property names which handle values that are text areas
const TEXT_AREA_PROPS: Set<EverySchemaPropName> = new Set(['textArea']);
// schema property names which handle values that are coordinates
const COORD_PROPS: Set<EverySchemaPropName> = new Set(['at', 'start', 'end']);

export type CompileProp = (
  prop: EverySchemaPropName,
  propToAnimationKeyframes: PropToAnimationKeyframe,
  easing: EasingFunction,
) => AnimationFunction;

const DEFAULT_START = {
  progress: 0,
  value: (val: any) => val,
} as const;

const DEFAULT_END = {
  progress: 1,
  value: (val: any) => val,
} as const;

const DEFAULT_EASING: EasingOption = 'linear';

const isCustomInputObject = (obj: unknown) => {
  const isObj = isPlainObject(obj);
  if (!isObj) return false;
  const hasValueProp = 'value' in obj;
  const hasEasingProp = 'easing' in obj;
  const numOfProps = Object.keys(obj).length;
  return hasValueProp && numOfProps === (hasEasingProp ? 2 : 1);
};

export const compileTimeline = (timeline: Timeline<any>): CompiledTimeline => {
  const tl: CompiledTimeline = {
    durationMs: timeline.durationMs,
    delayMs: timeline?.delayMs ?? 0,
    properties: {},
    validShapes: new Set(timeline.forShapes),
  };

  const rawTimelineKeyframes = timeline?.keyframes ?? [];

  const propsInTimeline = [
    ...new Set(
      rawTimelineKeyframes.map((kf) => Object.keys(kf.properties)).flat(),
    ),
  ] as EverySchemaPropName[];

  const propToAnimationKeyframes = propsInTimeline.reduce((acc, prop) => {
    const propInTimeline = rawTimelineKeyframes
      .map((kf): AnimationKeyframe<any> => {
        const propVal = kf.properties[prop];
        const isObj = isCustomInputObject(propVal);
        const value = isObj ? propVal.value : propVal;
        const easing = isObj ? propVal?.easing : undefined;
        return {
          progress: kf.progress,
          value,
          easing:
            easing !== undefined ? easingOptionToFunction(easing) : easing,
        };
      })
      .filter(({ value }) => value !== undefined);

    if (propInTimeline.at(0)?.progress !== 0) {
      propInTimeline.unshift(DEFAULT_START);
    }

    if (propInTimeline.at(-1)?.progress !== 1) {
      propInTimeline.push(DEFAULT_END);
    }

    acc[prop] = propInTimeline;
    return acc;
  }, {} as PropToAnimationKeyframe);

  const getDefaultEasing = (prop: EverySchemaPropName) => {
    const defaultEasingOption = timeline.easing?.[prop] ?? DEFAULT_EASING;
    return easingOptionToFunction(defaultEasingOption);
  };

  // TODO replace this with real object validation solutions like zod
  const isCoord = (
    propVal: unknown,
    propName: EverySchemaPropName,
  ): propVal is Coordinate => COORD_PROPS.has(propName);
  const isTextArea = (
    propVal: unknown,
    propName: EverySchemaPropName,
  ): propVal is TextArea => TEXT_AREA_PROPS.has(propName);

  const interpolationFns = [
    {
      predicate: (propVal: unknown) => typeof propVal === 'number',
      fn: interpolateNumber,
    },
    {
      predicate: (propVal: unknown): propVal is Color =>
        typeof propVal === 'string' && isColorString(propVal),
      fn: interpolateColor,
    },
    {
      predicate: isCoord,
      fn: interpolateCoordinate,
    },
    {
      predicate: isTextArea,
      fn: interpolateTextArea,
    },
  ] as const;

  for (const propName of propsInTimeline) {
    tl.properties[propName] = (schemaWithDefaults, progress) => {
      const rawPropVal = schemaWithDefaults[propName];

      // if the prop value on the underlying schema is not set, property cant be animated
      if (rawPropVal === undefined) return;

      const interpolation = interpolationFns.find(({ predicate }) =>
        predicate(rawPropVal, propName),
      );
      if (!interpolation)
        throw `cannot interpolate value: ${JSON.stringify(rawPropVal)}`;

      const keyframes = propToAnimationKeyframes[propName]!.map((kf) => {
        const getValue = () => {
          if (typeof kf.value === 'function') {
            return kf.value(rawPropVal, schemaWithDefaults);
          }

          return kf.value;
        };

        const value = getValue();
        // we do this check because for TS because partial fields do not error when
        // explicity set to undefined by the consumer
        if (value === undefined) throw 'keyframe value cannot be undefined!';

        return {
          ...kf,
          // allows users to only return partial text areas in the keyframe definition
          value: isTextArea(rawPropVal, propName)
            ? resolveTextArea(value)!.textArea
            : value,
        };
      });

      return interpolation.fn(
        keyframes,
        getDefaultEasing(propName),
        // @ts-expect-error could make TS happy, but would make this verbose unfortunately
        rawPropVal,
      )(progress);
    };
  }

  const { customInterpolations } = timeline;
  if (customInterpolations) {
    const allCustomInterpolations = Object.entries(customInterpolations) as [
      EverySchemaPropName,
      ImperativeTrack<any, any>,
    ][];
    for (const [propName, interpolationOptions] of allCustomInterpolations) {
      const { easing: easingRaw, value } = interpolationOptions;
      const easing = easingRaw ?? getDefaultEasing(propName);
      const easingFn = easingOptionToFunction(easing);
      tl.properties[propName] = (schemaWithDefaults, progress) => value(easingFn(progress), schemaWithDefaults);
    }
  }

  return tl;
};
