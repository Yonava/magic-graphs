import { PartiallyPartial } from '@magic/utils/types';

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

export type ResolvePluginSchema<Schema extends TestSchema> = {
  [K in keyof DefaultPluginSchema]: K extends keyof Schema
    ? NonNullable<Schema[K]>
    : DefaultPluginSchema[K];
};
