import { GraphCoreControls } from '../core/types.ts';
import { GenericEventMap } from '../events/types.ts';

type GenericPluginData = {
  controls: object;
  events: GenericEventMap;
};

export type GraphPlugin<
  PluginData extends GenericPluginData,
  DependentPluginData extends GenericPluginData = GenericPluginData,
> = (
  graph: GraphCoreControls & DependentPluginData['controls'],
) => PluginData['controls'];

export type LooseGraphPlugin = (
  graph: GraphCoreControls,
) => GenericPluginData['controls'];

export type RemoveArray<T> = T extends (infer F)[] ? F : T;
