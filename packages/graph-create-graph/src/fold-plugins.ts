import { getValue } from '@core/utils/maybeGetter/index';
import { core as createCore } from '@graph/core/index';
import { CoreOptions } from '@graph/core/options';
import {
  LooseGraphPlugin,
  PluginThemeField,
} from '@graph/plugins-shared/plugins';
import { TransitControls } from '@graph/primitives/transit/types';

type PluginTransitControl = {
  pluginName: string;
  transit: TransitControls<any>;
};

type FoldedPlugins = {
  controls: any;
  events: any;
  actions: any;
  getters: any;
  themeDetectors: NonNullable<PluginThemeField<any>['theme']['detectors']>;
  pluginTransitControls: PluginTransitControl[];
};

const applyThemePreset = (
  pluginThemeField: PluginThemeField<any>['theme'],
  presetTokens: Record<string, any>,
) => {
  const { set } = pluginThemeField.createLayer('create-graph/theme-presets');
  for (const token of Object.keys(presetTokens)) {
    set(token, (...args: any[]) => getValue(presetTokens[token], ...args));
  }
};

// TODO add topo sort and explicit error handling for missing plugin dependencies
export const foldPlugins = (
  coreOptions: Partial<CoreOptions>,
  plugins: LooseGraphPlugin[],
  themePresets: Record<string, any>,
  activePresetName: string,
): FoldedPlugins => {
  const core = createCore(coreOptions);

  let controls = core.controls;
  let events: any = core.events;
  let actions = core.actions;
  let getters = core.getters;
  let themeDetectors: NonNullable<PluginThemeField<any>['theme']['detectors']> =
    {};

  const pluginTransitControls: PluginTransitControl[] = [
    { pluginName: 'core', transit: core.transit },
  ];

  for (const plugin of plugins) {
    const pluginResult = plugin({ controls, events, actions, getters });

    controls = { ...controls, [pluginResult.name]: pluginResult.controls };
    events = pluginResult.events;
    actions = { ...actions, ...pluginResult.actions };
    getters = { ...getters, ...pluginResult.getters };

    const transit = pluginResult.transit;
    if (transit) {
      pluginTransitControls.push({ pluginName: pluginResult.name, transit });
    }

    const pluginThemeField: PluginThemeField<any>['theme'] | undefined = (
      pluginResult.controls as any
    )?.theme;

    if (pluginThemeField) {
      applyThemePreset(
        pluginThemeField,
        themePresets[activePresetName][pluginResult.name],
      );
      themeDetectors = { ...themeDetectors, ...pluginThemeField.detectors };
    }

    pluginResult.onAfterInit?.();
  }

  return {
    controls,
    events,
    actions,
    getters,
    themeDetectors,
    pluginTransitControls,
  };
};
