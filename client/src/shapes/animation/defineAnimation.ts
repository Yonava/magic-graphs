
export type AnimatedProps = Partial<{
  lineWidth: {
    scalar: number,
    at: number
  }[],
  width: {
    scalar: number,
    at: number
  }[],
}>

export type AnimationDefinitionId = string

export class DefineAnimation {
  #animatedProps: AnimatedProps = {};

  #currentProgress = 0;

  /**
   * a unique identifier for this definition
   */
  id: AnimationDefinitionId
  /**
   * the duration of this animation (in milliseconds)
   */
  durationMs: number

  constructor(id: string, durationMs: number) {
    this.id = id
    this.durationMs = durationMs
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
    const entry = {
      scalar,
      at: this.#currentProgress
    }

    const lineWidthProp = this.#animatedProps['lineWidth']

    if (!lineWidthProp) {
      this.#animatedProps['lineWidth'] = [entry]
    } else {
      lineWidthProp.push(entry)
    }

    return this
  }

  width(scalar: number) {
    const entry = {
      scalar,
      at: this.#currentProgress
    }

    const widthProp = this.#animatedProps['width']

    if (!widthProp) {
      this.#animatedProps['width'] = [entry]
    } else {
      widthProp.push(entry)
    }

    return this
  }

  getDefinition() {
    return {
      id: this.id,
      durationMs: this.durationMs,
      props: this.#animatedProps
    }
  }
}

export type AnimationDefinition = ReturnType<DefineAnimation['getDefinition']>