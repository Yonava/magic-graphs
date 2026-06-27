import { LoosePluginData } from './loose.ts';

type DefaultPluginData = {
  controls: {};
  events: {};
  getters: {};
  actions: {};
  dependsOn: [];
  optionalDependsOn: [];
};

export type ResolvePluginData<PartialPluginData> = {
  [K in keyof LoosePluginData]: K extends keyof PartialPluginData
    ? NonNullable<PartialPluginData[K]>
    : DefaultPluginData[K];
};
