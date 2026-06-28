import { LoosePluginSchema } from './loose.ts';

type DefaultPluginSchema = {
  controls: {};
  events: {};
  getters: {};
  actions: {};
  dependsOn: [];
  optionalDependsOn: [];
};

export type ResolvePluginData<PartialPluginData> = {
  [K in keyof LoosePluginSchema]: K extends keyof PartialPluginData
    ? NonNullable<PartialPluginData[K]>
    : DefaultPluginSchema[K];
};
