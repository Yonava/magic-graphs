import { nullThrows } from '@core/utils/assert';
import { getValue } from '@core/utils/maybeGetter/index';
import { core as createCore } from '@graph/core/index';
import { CoreOptions } from '@graph/core/options';
import { CoreControls } from '@graph/core/types';
import { createComputedTokenResolver } from '@graph/plugins-shared/computed-tokens';
import {
  ExtractActions,
  ExtractControls,
  ExtractEventMap,
  ExtractGetters,
  ExtractTransitPayload,
  LooseGraphPlugin,
  PluginThemeField,
  PluginThemes,
} from '@graph/plugins-shared/plugins';
import {
  AggregatorTransformer,
  CanvasElement,
} from '@graph/plugins/canvas/aggregator/types';
import { CANVAS_ELEMENT_CURSOR_FIELD_KEY } from '@graph/plugins/canvas/setupCanvasCursor';
import { CanvasControls } from '@graph/plugins/canvas/types';
import { GraphActions } from '@graph/primitives/actions/types';
import { EventHub } from '@graph/primitives/events/createEventHub';
import { GraphGetters } from '@graph/primitives/getters/types';
import { TransitControls } from '@graph/primitives/transit/types';
import { CoreEdge, CoreNode } from '@graph/primitives/types';
import type { Prettify } from 'ts-essentials';

import {
  edgeRenderer,
  resolveEdgeComputedTokens,
} from './render-functions/edge.ts';
import {
  nodeRenderer,
  resolveNodeComputedTokens,
} from './render-functions/node.ts';
import { GraphTransit } from './types.ts';

type CreateGraphOptions<
  TPlugins extends LooseGraphPlugin[],
  PresetName extends string,
> = {
  plugins: TPlugins;
  themePresets: Record<PresetName, PluginThemes<NoInfer<TPlugins>>>;
  options: Partial<CoreOptions>;
};

export const createGraph = <
  const TPlugins extends LooseGraphPlugin[],
  PresetName extends string,
>({
  plugins,
  themePresets,
  options = {},
}: CreateGraphOptions<TPlugins, PresetName>) => {
  const core = createCore(options);

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

  const pluginTransitControls: {
    pluginName: string;
    transit: TransitControls<any>;
  }[] = [{ pluginName: 'core', transit: core.transit }];

  for (const plugin of plugins) {
    const pluginResult = plugin({
      controls: evolvingControls,
      events: evolvingEvents,
      actions: evolvingActions,
      getters: evolvingGetters,
    });
    evolvingControls = {
      ...evolvingControls,
      [pluginResult.name]: pluginResult.controls,
    };
    evolvingEvents = pluginResult.events;
    evolvingActions = { ...evolvingActions, ...pluginResult.actions };
    evolvingGetters = { ...evolvingGetters, ...pluginResult.getters };

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
        (themePresets as any)[activePresetName][pluginResult.name],
      );
      for (const token of tokens) {
        set(token, (...args: any[]) =>
          getValue(
            (themePresets as any)[activePresetName][pluginResult.name][token],
            ...args,
          ),
        );
      }

      evolvingThemeDetectors = {
        ...evolvingThemeDetectors,
        ...pluginThemeField.detectors,
      };
    }

    pluginResult.onAfterInit?.();
  }

  const events = evolvingEvents as EventHub<ExtractEventMap<NoInfer<TPlugins>>>;

  const controls = evolvingControls as Prettify<
    ExtractControls<NoInfer<TPlugins>>
  >;

  const actions = evolvingActions as GraphActions<
    ExtractActions<NoInfer<TPlugins>>
  >;

  const getters = evolvingGetters as GraphGetters<
    ExtractGetters<NoInfer<TPlugins>>
  >;

  const tokenResolver = createComputedTokenResolver(evolvingThemeDetectors);

  const nodeCanvasElement = (node: CoreNode): CanvasElement | undefined => {
    // assume we have canvas plugin!
    const castControls = controls as unknown as CoreControls & {
      canvas: CanvasControls;
    };

    const shape = nodeRenderer({
      resolver: tokenResolver,
      controls: castControls,
      node,
    });

    if (!shape) return;

    return {
      id: node.id,
      priority: castControls.canvas.getNodePriority()(node.id),
      shape,
      data: {
        [CANVAS_ELEMENT_CURSOR_FIELD_KEY]: tokenResolver('node.cursor', node),
      },
    };
  };

  const edgeCanvasElement = (edge: CoreEdge): CanvasElement | undefined => {
    // assume we have canvas in controls since this is a theme aware orchestrator!
    const castControls = controls as unknown as CoreControls & {
      canvas: CanvasControls;
    };
    const shape = edgeRenderer({
      resolver: tokenResolver,
      controls: castControls,
      edge,
    });

    if (!shape) return;

    return {
      shape,
      id: edge.id,
      priority: 1,
      data: {
        [CANVAS_ELEMENT_CURSOR_FIELD_KEY]: tokenResolver('edge.cursor', edge),
      },
    };
  };

  // assume we have canvas in controls since this is a theme aware orchestrator!
  const { transformers } = (controls as unknown as { canvas: CanvasControls })
    .canvas.aggregator;

  const transformer: AggregatorTransformer = (agg) => {
    agg.push(...controls.nodes.map(nodeCanvasElement).filter((v) => !!v));
    agg.push(...controls.edges.map(edgeCanvasElement).filter((v) => !!v));
    return agg;
  };

  transformers.push(transformer);

  const resolveNodeStyles = resolveNodeComputedTokens(tokenResolver);
  const resolveEdgeStyles = resolveEdgeComputedTokens(tokenResolver);

  type GraphTransitControls = GraphTransit<
    Prettify<ExtractTransitPayload<NoInfer<TPlugins>>>
  >;

  const transit: GraphTransitControls = {
    encode: () =>
      pluginTransitControls.reduce(
        (result, { pluginName, transit }) => ({
          ...result,
          [pluginName]: transit.encode(),
        }),
        {} as ReturnType<GraphTransitControls['encode']>,
      ),
    decode: (data) => {
      const pluginsFailingValidation = pluginTransitControls.filter(
        ({ pluginName, transit }) =>
          !transit.validate((data as any)[pluginName]),
      );
      if (pluginsFailingValidation.length > 0) {
        const namesOfFailures = pluginsFailingValidation
          .map((p) => p.pluginName)
          .join(', ');
        throw new Error(
          `Data decode validation failed for: ${namesOfFailures}`,
        );
      }
      for (const { pluginName, transit } of pluginTransitControls) {
        transit.decode((data as any)[pluginName]);
      }
    },
  };

  return {
    ...controls,
    ...getters,
    actions,
    events,
    transit,
    theme: {
      tokenResolver,
      resolveNodeStyles,
      resolveEdgeStyles,
      activePresetName: () => activePresetName,
      activePreset: () => themePresets[activePresetName],
      setActivePreset: (newPresetName: PresetName) => {
        return (activePresetName = newPresetName);
      },
    },
  };
};

type GraphOptions = {
  plugins: LooseGraphPlugin[];
  presetName: string;
};

export type Graph<Options extends GraphOptions> = ReturnType<
  typeof createGraph<Options['plugins'], Options['presetName']>
>;
