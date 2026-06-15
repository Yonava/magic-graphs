import { GraphCoreControls } from '../core/types.ts';

export type GraphPlugin<PluginControls, DependentPluginControls = {}> = (
  graph: GraphCoreControls & DependentPluginControls,
) => PluginControls;

export type LooseGraphPlugin = (graph: GraphCoreControls) => object;
