import { getValue } from '@core/utils/maybeGetter/index';
import { ConsumerEventsHub } from '@graph/core/consumer-events';
import { core } from '@graph/core/index';
import {
  LooseGraphPlugin,
  PluginThemeField,
} from '@graph/plugins-shared/plugins';
import { TransitControls } from '@graph/primitives/transit/types';

import {
  ConsumerEventHub,
  createConsumerEventHub,
  createFinalActionsProxy,
  createGettersInvalidationEventHub,
  wrapActionsWithConsumerEvents,
  wrapWeightsControlsWithConsumerEvents,
} from './consumer-events.ts';
import { startGettersDiscrepancyAudit } from './getters-audit.ts';
import { createGettersCache } from './getters-cache.ts';

type PluginTransitControl = {
  pluginName: string;
  transit: TransitControls<any>;
};

type FoldedPlugins = {
  controls: any;
  events: ConsumerEventsHub;
  consumerEvents: ConsumerEventHub;
  actions: any;
  getters: any;
  themeDetectors: NonNullable<PluginThemeField<any>['theme']['detectors']>;
  pluginTransitControls: PluginTransitControl[];
  getNodes: () => any[];
  getEdges: () => any[];
  stopGettersAudit: () => void;
};

// TODO add topo sort and explicit error handling for missing plugin dependencies
export const foldPlugins = (
  coreGraph: ReturnType<typeof core>,
  plugins: LooseGraphPlugin[],
  themePresets: Record<string, any>,
  getActivePresetName: () => string,
): FoldedPlugins => {
  // create-graph owns the consumer event vocabulary (onNodesAdded, onStructureChange,
  // onEdgeWeightsChanged, etc.) since only it knows when a fully-composed plugin action
  // has finished, not just the underlying core transaction. it derives these by wrapping
  // the calls it has authority over (actions below, weight controls here) — never by
  // subscribing to core's own event hub. merged in up front so plugins can subscribe
  // during setup.
  const consumerEvents = createConsumerEventHub();
  // separate from consumerEvents on purpose — onGettersInvalidated is internal
  // plumbing for getNodes()/getEdges() staleness, not part of the curated consumer
  // vocabulary. only reachable via events._internal.gettersInvalidation.
  const gettersInvalidationEvents = createGettersInvalidationEventHub();

  let controls = {
    ...coreGraph.controls,
    weights: wrapWeightsControlsWithConsumerEvents(
      coreGraph.controls.weights,
      consumerEvents,
    ),
  };
  // consumer events are the primary surface — spread directly onto the top-level
  // `events` field. raw core events are still reachable, but namespaced under
  // `_internal` so they don't crowd the default autocomplete (see ConsumerEventsHub).
  const events: ConsumerEventsHub = {
    ...consumerEvents,
    _internal: {
      coreEvents: coreGraph.events,
      gettersInvalidation: gettersInvalidationEvents,
    },
  };
  let actions = coreGraph.actions;
  let getters = coreGraph.getters;
  const { finalActions, resolveFinalActions } = createFinalActionsProxy();
  let themeDetectors: NonNullable<PluginThemeField<any>['theme']['detectors']> =
    {};

  // closes over the `getters` binding above, so it always reads whatever plugins have
  // folded into it by the time a recompute actually runs (invalidateGetters() is
  // deferred to a microtask, and the initial recompute() below only runs once folding
  // is done).
  const gettersCache = createGettersCache(
    {
      nodeIds: () => coreGraph.controls.nodes.map((n) => n.id),
      edgeIds: () => coreGraph.controls.edges.map((e) => e.id),
    },
    () => getters,
    gettersInvalidationEvents,
  );
  // structural and weight changes are known to create-graph itself, so they invalidate
  // the getters cache automatically — no plugin author needs to remember to do this for
  // core mutations, only for their own plugin-local state (see nodeLabel for example).
  consumerEvents.subscribe('onStructureChange', gettersCache.invalidateGetters);
  consumerEvents.subscribe('onEdgeWeightsChanged', gettersCache.invalidateGetters);

  const pluginTransitControls: PluginTransitControl[] = [
    { pluginName: 'core', transit: coreGraph.transit },
  ];

  for (const plugin of plugins) {
    const pluginResult = plugin({
      controls,
      events,
      actions,
      finalActions,
      getters,
      invalidateGetters: gettersCache.invalidateGetters,
    });

    controls = { ...controls, [pluginResult.name]: pluginResult.controls };
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
      const { set } = pluginThemeField.createLayer(
        'create-graph/theme-presets',
      );
      const tokens = Object.keys(
        themePresets[getActivePresetName()][pluginResult.name],
      );
      for (const token of tokens) {
        set(token, (...args: any[]) =>
          getValue(
            themePresets[getActivePresetName()][pluginResult.name][token],
            ...args,
          ),
        );
      }
      themeDetectors = { ...themeDetectors, ...pluginThemeField.detectors };
    }

    pluginResult.onAfterInit?.();
  }

  const wrappedActions = wrapActionsWithConsumerEvents(actions, consumerEvents);
  resolveFinalActions(wrappedActions);

  // folding is done and `getters` has its final, fully-decorated shape — populate the
  // cache now rather than waiting for the first invalidateGetters() call, which may
  // never come if nothing mutates before a consumer reads getNodes()/getEdges().
  gettersCache.recompute();

  // dev-only safety net — see getters-audit.ts for why this doesn't need to know
  // which plugin (if any) forgot to call invalidateGetters.
  const stopGettersAudit = startGettersDiscrepancyAudit(
    {
      nodeIds: () => coreGraph.controls.nodes.map((n) => n.id),
      edgeIds: () => coreGraph.controls.edges.map((e) => e.id),
    },
    () => getters,
    gettersCache,
  );

  return {
    controls,
    events,
    consumerEvents,
    actions: wrappedActions,
    getters,
    themeDetectors,
    pluginTransitControls,
    getNodes: gettersCache.getNodes,
    getEdges: gettersCache.getEdges,
    stopGettersAudit,
  };
};
