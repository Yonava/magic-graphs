import type { Prettify } from "ts-essentials"
import { resolveTextArea, type TextAreaWithDefaults } from "./text/defaults"
import type { TextArea } from "./types/schema"
import type { PartiallyRequired } from "@utils/types"

type WithDefaults<
  Schema extends TextArea,
  Defaults extends Partial<Schema>
> = Prettify<
  Omit<PartiallyRequired<Schema, keyof Defaults>, 'textArea'> &
  { textArea?: TextAreaWithDefaults }
>

export const resolveDefaults = <
  TSchema extends TextArea,
  TDefaults extends Partial<TSchema>,
>(defaults: TDefaults) => (schema: TSchema) => {
  const { textArea, ...rest } = schema
  const resolvedSchema: WithDefaults<TSchema, TDefaults> = {
    ...defaults,
    ...resolveTextArea(textArea),
    ...rest,
  }

  return resolvedSchema
}