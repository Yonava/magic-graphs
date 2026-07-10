import { nullThrows } from '@core/utils/assert';
import { generateId } from '@core/utils/id';
import type { PluginThemes } from '@graph/plugins-shared/plugins';
import type { DeepPartial } from 'ts-essentials';

import { ref } from 'vue';

import { Graph, GraphPlugins } from '../graph/types.ts';
import { useProvidedGraph } from '../product/useProvidedGraph.ts';
import { Themer } from './types.ts';

type ThemeOverrides = DeepPartial<PluginThemes<GraphPlugins>>;

type ThemeLayerRecord = {
  [Name in keyof ThemeOverrides]: ReturnType<
    Graph[Name]['theme']['createLayer']
  >;
};

export const useThemer = (
  themeOverrides: ThemeOverrides,
  themeId = generateId(),
): Themer => {
  const graph = useProvidedGraph();
  let isActive = false;

  const pluginNames = Object.keys(themeOverrides) as (keyof ThemeOverrides)[];

  const layers = {} as ThemeLayerRecord;
  for (const pluginName of pluginNames) {
    // @ts-expect-error dynamic stuff like this is a known typescript inference limitation
    layers[pluginName] = graph[pluginName].theme.createLayer(themeId);
  }

  const activate = () => {
    isActive = true;
    for (const pluginName of pluginNames) {
      const layer = nullThrows(
        layers[pluginName],
        'layers is created with pluginNames',
      );

      const pluginOverrides = themeOverrides[pluginName];
      if (!pluginOverrides) continue;

      for (const [tokenName, themeValue] of Object.entries(pluginOverrides)) {
        // DeepPartial allows explicit `undefined` values, so guard even though no real caller would pass one
        if (themeValue === undefined) continue;
        // @ts-expect-error dynamic stuff like this is a known typescript inference limitation
        layer.set(tokenName, themeValue);
      }
    }
  };

  const deactivate = () => {
    isActive = false;
    for (const pluginName of pluginNames) {
      const layer = nullThrows(
        layers[pluginName],
        'layers is created with pluginNames',
      );

      layer.removeAll();
    }
  };

  return {
    activate,
    deactivate,
    isActive: () => isActive,
  };
};
