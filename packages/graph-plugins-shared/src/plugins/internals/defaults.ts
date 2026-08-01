import { PartiallyPartial } from '@core/utils/types';
import { Prettify } from 'ts-essentials';

import { LoosePluginSchema } from './loose.ts';

export type PluginSchemaDefaults = {
  // never, not {}: an undeclared controls, getters, actions or transit field drops off
  // the plugin's output entirely (see ./output-fields.ts)
  controls: never;
  events: {};
  getters: never;
  actions: never;
  transit: never;
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
