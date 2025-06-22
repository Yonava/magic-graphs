import { EASING_FUNCTIONS, type EasingFunction } from "@utils/animate";

type ScalarPoint = {
  scalar: number;
  progress: number
};

const scalarProps = ['lineWidth', 'width'] as const

type ScalarProps = {
  [K in typeof scalarProps[number]]: ScalarPoint[]
}

type OffsetPoint = {
  offset: number,
  progress: number
}

const offsetProps = ['rotation'] as const

type OffsetProps = {
  [K in typeof offsetProps[number]]: OffsetPoint[]
}

export type AnimatedProps = Partial<ScalarProps>

type AnimatedPropFns = {
  [K in Extract<keyof AnimatedProps, keyof ScalarProps>]?: (progress: number) => number
}

export const getScalarAt = (
  points: ScalarPoint[],
  easing: EasingFunction
) => (progress: number) => {
  if (points.length === 0) return 1; // default fallback

  if (progress <= points[0].progress) return points[0].scalar;
  if (progress >= points[points.length - 1].progress) return points[points.length - 1].scalar;

  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];

    if (progress >= p1.progress && progress <= p2.progress) {
      const t = (progress - p1.progress) / (p2.progress - p1.progress);
      return p1.scalar + easing(t) * (p2.scalar - p1.scalar);
    }
  }

  return 1; // fallback, should not be reached
};

export type AnimationDefinitionId = string

export class DefineAnimation<T extends string = string> {
  #animatedProps: AnimatedProps = {};

  #currentProgress = 0;

  /**
   * a unique identifier for this definition
   */
  id: AnimationDefinitionId
  /**
   * the duration of this animation (in milliseconds)
   * @default 1000
   */
  durationMs = 1000

  constructor(id: T) {
    this.id = id
  }

  #scalarProp(key: keyof ScalarProps, scalar: number) {
    const entry = {
      scalar,
      progress: this.#currentProgress
    }

    const scalarProp = this.#animatedProps[key]

    if (!scalarProp) {
      this.#animatedProps[key] = [entry]
    } else {
      scalarProp.push(entry)
    }

    return this
  }

  duration({ ms }: { ms: number }) {
    this.durationMs = ms;
    return this
  }

  from() {
    this.#currentProgress = 0
    return this
  }

  to() {
    this.#currentProgress = 1
    return this
  }

  at(progress: number) {
    this.#currentProgress = progress
    return this
  }

  lineWidth(scalar: number) {
    return this.#scalarProp('lineWidth', scalar)
  }

  width(scalar: number) {
    return this.#scalarProp('width', scalar)
  }

  rotation(degrees: number) {
    return this.#scalarProp('rotation', scalar)
  }

  getDefinition() {
    const props: AnimatedPropFns = {}

    for (const propName of scalarProps) {
      const propVal = this.#animatedProps[propName]
      if (propVal) props[propName] = getScalarAt(propVal, EASING_FUNCTIONS.linear)
    }

    return {
      id: this.id,
      durationMs: this.durationMs,
      props,
    }
  }
}

export type AnimationDefinition = ReturnType<DefineAnimation['getDefinition']>