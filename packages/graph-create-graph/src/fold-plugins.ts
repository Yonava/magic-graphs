import { getValue } from '@core/utils/maybeGetter/index';
import { core as createCore } from '@graph/core/index';
import { CoreEventMap } from '@graph/core/events';
import { CoreOptions } from '@graph/core/options';
import {
  LooseGraphPlugin,
  PluginThemeField,
} from '@graph/plugins-shared/plugins';
import { mergeEventHubs } from '@graph/primitives/events/mergeEventHubs';
import { TransitControls } from '@graph/primitives/transit/types';

import {
  StructuralEventMap,
  createFinalActionsProxy,
  createStructuralEventHub,
  wrapActionsWithStructuralEvents,
} from './structural-events.ts';

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
  themePresets: Record<string, any>,
  getActivePresetName: () => string,
  pluginName: string,
) => {
  const { set } = pluginThemeField.createLayer('create-graph/theme-presets');
  const tokens = Object.keys(themePresets[getActivePresetName()][pluginName]);
  for (const token of tokens) {
    set(token, (...args: any[]) =>
      getValue(
        themePresets[getActivePresetName()][pluginName][token],
        ...args,
      ),
    );
  }
};

// TODO add topo sort and explicit error handling for missing plugin dependencies
export const foldPlugins = (
  coreOptions: Partial<CoreOptions>,
  plugins: LooseGraphPlugin[],
  themePresets: Record<string, any>,
  getActivePresetName: () => string,
): FoldedPlugins => {
  const core = createCore(coreOptions);

  // create-graph owns the coarse structural events (onNodesAdded, onStructureChange, etc.)
  // since only it knows when a fully-composed plugin action has finished, not just the
  // underlying core transaction. merged in up front so plugins can subscribe during setup.
  const structuralEvents = createStructuralEventHub();
  core.events.subscribe('onEdgeWeightsCommitted', () =>
    structuralEvents.emit('onStructureChange'),
  );

  let controls = core.controls;
  let events: any = mergeEventHubs<CoreEventMap, StructuralEventMap>(
    core.events,
    structuralEvents,
  );
  let actions = core.actions;
  let getters = core.getters;
  const { finalActions, resolveFinalActions } = createFinalActionsProxy();
  let themeDetectors: NonNullable<PluginThemeField<any>['theme']['detectors']> =
    {};

  const pluginTransitControls: PluginTransitControl[] = [
    { pluginName: 'core', transit: core.transit },
  ];

  for (const plugin of plugins) {
    const pluginResult = plugin({
      controls,
      events,
      actions,
      finalActions,
      getters,
    });

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
        themePresets,
        getActivePresetName,
        pluginResult.name,
      );
      themeDetectors = { ...themeDetectors, ...pluginThemeField.detectors };
    }

    pluginResult.onAfterInit?.();
  }

  const wrappedActions = wrapActionsWithStructuralEvents(
    actions,
    structuralEvents,
  );
  resolveFinalActions(wrappedActions);

  return {
    controls,
    events,
    actions: wrappedActions,
    getters,
    themeDetectors,
    pluginTransitControls,
  };
};
