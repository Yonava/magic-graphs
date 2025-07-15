
export type EasingFunction = (step: number) => number;

export const EASING_PRESETS = {
  linear: (step) => step,
  in: (step) => step * step,
  out: (step) => step * (2 - step),
  'in-out': (step) =>
    step < 0.5 ? 2 * step * step : -1 + (4 - 2 * step) * step,
} as const satisfies Record<string, EasingFunction>

export type EasingPreset = keyof typeof EASING_PRESETS

export type EasingOption = EasingFunction | EasingPreset

export const easingOptionToFunction = (easing: EasingOption) => {
  return typeof easing === 'function' ? easing : EASING_PRESETS[easing]
}
