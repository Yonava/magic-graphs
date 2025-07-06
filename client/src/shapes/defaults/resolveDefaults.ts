import type { Prettify } from "ts-essentials"
import { resolveTextArea } from "../text/defaults"
import type { TextArea } from "../types/schema"
import type { PartiallyRequired } from "@utils/types"

type WithDefaults<
  Schema extends TextArea,
  Defaults extends Partial<Schema>
> = Prettify<
  Omit<PartiallyRequired<Schema, keyof Defaults>, 'textArea'> &
  ReturnType<typeof resolveTextArea>
>

export const resolveDefaults = <
  TSchema extends TextArea,
  TDefaults extends Partial<TSchema>,
>(defaults: TDefaults) => (schema: TSchema) => {
  const { textArea, ...rest } = schema

  const cleanedRest = Object.fromEntries(
    Object.entries(rest).filter(
      ([key, value]) => !(key in defaults && value === undefined)
    )
  )

  const resolvedSchema: WithDefaults<TSchema, TDefaults> = {
    ...defaults,
    ...resolveTextArea(textArea),
    ...cleanedRest,
  }

  return resolvedSchema
}