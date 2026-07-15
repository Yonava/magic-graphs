import { nullThrows } from '@core/utils/assert';
import { core as createCore } from '@graph/core/index';
import { CoreOptions } from '@graph/core/options';
import { CoreControls } from '@graph/core/types';
import { createComputedTokenResolver } from '@graph/plugins-shared/computed-tokens';
import {
  ExtractActions,
  ExtractControls,
  ExtractEventMap,
  ExtractGetters,
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

  const encodingFns: { pluginName: string; encode: () => any }[] = [
    { pluginName: 'core', encode: core.encode },
  ];

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

    const encodeFn = pluginResult.encode;
    if (encodeFn) {
      encodingFns.push({ pluginName: pluginResult.name, encode: encodeFn });
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
        set(
          token,
          () =>
            (themePresets as any)[activePresetName][pluginResult.name][token],
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
    // assume we have canvas plugin!
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

  return {
    ...controls,
    ...getters,
    actions,
    events,
    encode: () => {
      return encodingFns.reduce(
        (result, pluginEncode) => ({
          ...result,
          [pluginEncode.pluginName]: pluginEncode.encode(),
        }),
        {} as Record<string, any>,
      );
    },
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
