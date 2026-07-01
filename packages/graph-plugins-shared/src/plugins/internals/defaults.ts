import { PartiallyPartial } from '@magic/utils/types';
import { Prettify } from 'ts-essentials';

import { LoosePluginSchema } from './loose.ts';

export type DefaultPluginSchema = {
  controls: {};
  events: {};
  getters: {};
  actions: {};
  dependsOn: [];
  optionalDependsOn: [];
};

export type TestSchema = PartiallyPartial<
  LoosePluginSchema,
  keyof DefaultPluginSchema
>;

export type ResolvePluginSchema<Schema extends TestSchema> = Prettify<
  {
    [K in keyof DefaultPluginSchema]: K extends keyof Schema
      ? NonNullable<Schema[K]>
      : DefaultPluginSchema[K];
  } & Omit<Schema, keyof DefaultPluginSchema>
>;

type t = ResolvePluginSchema<{ name: string }>;
