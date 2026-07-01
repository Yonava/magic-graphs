import { PartiallyPartial } from '@magic/utils/types';
import { Prettify } from 'ts-essentials';

import { LoosePluginSchema } from './loose.ts';

export type PluginSchemaDefaults = {
  controls: {};
  events: {};
  getters: {};
  actions: {};
  dependsOn: [];
  optionalDependsOn: [];
};

export type PluginSchemaInput = PartiallyPartial<
  LoosePluginSchema,
  keyof PluginSchemaDefaults
>;

export type ResolvePluginSchema<Schema extends PluginSchemaInput> = Prettify<
  {
    [K in keyof PluginSchemaDefaults]: K extends keyof Schema
      ? NonNullable<Schema[K]>
      : PluginSchemaDefaults[K];
  } & Omit<Schema, keyof PluginSchemaDefaults>
>;
