import { GraphActions } from '@magic/graph-core-infra/actions/types';
import { EventHub } from '@magic/graph-core-infra/events/createEventHub';
import { GraphGetters } from '@magic/graph-core-infra/getters/types';
import { createComputedTokenResolver } from '@magic/graph-plugins-shared/computed-tokens/createComputedTokenResolver';
import {
  ExtractActions,
  ExtractControls,
  ExtractEventMap,
  ExtractGetters,
  LooseGraphPlugin,
} from '@magic/graph-plugins-shared/plugins/types';
import { ThemeController } from '@magic/graph-plugins-shared/theme/createThemeController';
import {
  PluginThemeField,
  ThemesForPlugins,
} from '@magic/graph-plugins-shared/types';
import { core as createCore } from '@magic/graph/core/index';
import { CoreControls } from '@magic/graph/core/types';
import { GraphSettings } from '@magic/graph/settings/index';
import { nullThrows } from '@magic/utils/assert';
import type { Prettify } from 'ts-essentials';

type CreateGraphOptions<
  TPlugins extends LooseGraphPlugin[],
  PresetName extends string,
> = {
  plugins: TPlugins;
  themePresets: Record<PresetName, ThemesForPlugins<NoInfer<TPlugins>>>;
  settings: Partial<GraphSettings>;
};

export const createGraph = <
  const TPlugins extends LooseGraphPlugin[],
  PresetName extends string,
>({
  plugins,
  themePresets,
  settings = {},
}: CreateGraphOptions<TPlugins, PresetName>) => {
  const core = createCore({ settings });

  const presetNames = Object.keys(themePresets) as PresetName[];

  let activePresetName = nullThrows(
    presetNames.at(0),
    'createGraph requires at least 1 theme preset!',
  );

  // TODO add topo sort and explicit error handling for missing plugin dependencies

  let evolvingControls = core.controls;
  let evolvingEvents: any = core.events;
  let evolvingActions = core.actions;
  let evolvingGetters = core.getters;

  // plugin name to the registered detectors
  let evolvingThemeDetectors: PluginThemeField<any>['theme']['detectors'] = {};

  for (const plugin of plugins) {
    const pluginResult = plugin(
      evolvingControls,
      evolvingEvents,
      evolvingActions,
      evolvingGetters,
    );
    evolvingControls = { ...evolvingControls, ...pluginResult.controls };
    evolvingEvents = pluginResult.events;
    evolvingActions = { ...evolvingActions, ...pluginResult.actions };
    evolvingGetters = { ...evolvingGetters, ...pluginResult.getters };

    const pluginName = nullThrows(
      Object.keys(pluginResult.controls).at(0),
      'Could not resolve name of plugin',
    );
    const pluginThemeField: PluginThemeField<any>['theme'] | undefined = (
      pluginResult.controls as any
    )[pluginName]?.theme;

    if (!pluginThemeField) continue;

    const { set } = pluginThemeField.createLayer('create-graph/theme-presets');
    const tokens = Object.keys((themePresets as any)[pluginName]);
    for (const token of tokens) {
      set(token, () => (themePresets as any)[pluginName][token]);
    }

    evolvingThemeDetectors = {
      ...evolvingThemeDetectors,
      ...pluginThemeField.detectors,
    };
  }

  const resolver = createComputedTokenResolver(evolvingThemeDetectors);

  const events = evolvingEvents as EventHub<ExtractEventMap<NoInfer<TPlugins>>>;

  const controls = evolvingControls as Prettify<
    CoreControls & ExtractControls<NoInfer<TPlugins>>
  >;

  const actions = evolvingActions as GraphActions<
    ExtractActions<NoInfer<TPlugins>>
  >;

  const getters = evolvingGetters as GraphGetters<
    ExtractGetters<NoInfer<TPlugins>>
  >;

  return {
    ...controls,
    ...getters,
    actions,
    events,
    themePresets: {
      activePresetName: () => activePresetName,
      activePreset: () => themePresets[activePresetName],
      setActivePreset: (newPresetName: PresetName) =>
        (activePresetName = newPresetName),
    },
  };
};
