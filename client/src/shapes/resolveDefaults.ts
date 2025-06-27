import type { Prettify } from "ts-essentials"
import { resolveTextArea } from "./text/defaults"
import type { TextArea } from "./types/schema"

export const resolveDefaults = <T extends TextArea>(defaults: Partial<T>) => (schema: T) => {
  const { textArea, ...rest } = schema
  return {
    ...defaults,
    ...resolveTextArea(textArea),
    ...rest
  }
}

export type WithDefaults<T extends TextArea> = Prettify<
  ReturnType<
    ReturnType<typeof resolveDefaults<T>>
  >
>