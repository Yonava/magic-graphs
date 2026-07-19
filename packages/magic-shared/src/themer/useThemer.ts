import { nullThrows } from '@core/utils/assert';
import { generateId } from '@core/utils/id';
import type { PluginThemes } from '@graph/plugins-shared/plugins';
import type { DeepPartial } from 'ts-essentials';

import { Graph, GraphPlugins } from '../graph/types.ts';
import { useProvidedGraph } from '../product/useProvidedGraph.ts';
import { Themer } from './types.ts';

type ThemeOverrides = DeepPartial<PluginThemes<GraphPlugins>>;

type ThemeLayerRecord = {
  [Name in keyof ThemeOverrides]: ReturnType<
    Graph[Name]['theme']['createLayer']
  >;
};

type Options = {
  graph: Graph;
  layerId: string;
};

export const useThemer = (
  themeOverrides: ThemeOverrides,
  options: Partial<Options> = {},
): Themer => {
  const graph = options.graph ?? useProvidedGraph();
  const layerId = options.layerId ?? generateId();

  let isActive = false;

  const pluginNames = Object.keys(themeOverrides) as (keyof ThemeOverrides)[];

  const layers = {} as ThemeLayerRecord;
  for (const pluginName of pluginNames) {
    // @ts-ignore dynamic stuff like this is a known typescript inference limitation
    layers[pluginName] = graph[pluginName].theme.createLayer(layerId);
  }

  const getLayer = (pluginName: keyof ThemeOverrides) =>
    nullThrows(layers[pluginName], 'layers is created with pluginNames');

  const activate = () => {
    isActive = true;
    for (const pluginName of pluginNames) {
      const layer = getLayer(pluginName);

      const pluginOverrides = themeOverrides[pluginName];
      if (!pluginOverrides) continue;

      for (const [tokenName, themeValue] of Object.entries(pluginOverrides)) {
        // DeepPartial allows explicit `undefined` values, so guard even though no real caller would pass one
        if (themeValue === undefined) continue;
        // @ts-ignore dynamic stuff like this is a known typescript inference limitation
        layer.set(tokenName, themeValue);
      }
    }
  };

  const deactivate = () => {
    isActive = false;
    for (const pluginName of pluginNames) {
      getLayer(pluginName).removeAll();
    }
  };

  return {
    activate,
    deactivate,
    isActive: () => isActive,
  };
};

export const createThemer = (
  graph: Graph,
  themeOverrides: ThemeOverrides,
  layerId = generateId(),
) => useThemer(themeOverrides, { graph, layerId });
