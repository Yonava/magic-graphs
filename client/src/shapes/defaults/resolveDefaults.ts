import type { Prettify } from "ts-essentials"
import { resolveTextArea } from "../text/defaults"
import type { TextArea } from "../types/schema"
import type { PartiallyRequired } from "@utils/types"

type WithDefaults<
  Schema extends TextArea,
  Defaults extends Record<string, unknown>
> = Prettify<
  Omit<PartiallyRequired<Schema, Extract<keyof Defaults, keyof Schema>>, 'textArea'> &
  ReturnType<typeof resolveTextArea>
>

export const resolveDefaults = <
  TSchema extends TextArea,
  TDefaults extends Record<string, unknown>
>(defaults: TDefaults) => (schema: TSchema) => {
  const { textArea, ...rest } = schema

  const cleanedRest = Object.fromEntries(
    Object.entries(rest).filter(
      ([key, value]) => !(key in defaults && value === undefined)
    )
  )

  // @ts-expect-error this works... but the types are being weird
  const resolvedSchema: WithDefaults<TSchema, TDefaults> = {
    ...defaults,
    ...resolveTextArea(textArea),
    ...cleanedRest,
  }

  return resolvedSchema
}