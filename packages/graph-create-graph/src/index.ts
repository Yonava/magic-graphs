import { nullThrows } from '@core/utils/assert';
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
  PluginThemes,
} from '@graph/plugins-shared/plugins';
import { AggregatorTransformer } from '@graph/plugins/canvas/aggregator/types';
import { CanvasControls } from '@graph/plugins/canvas/types';
import { GraphActions } from '@graph/primitives/actions/types';
import { EventHub } from '@graph/primitives/events/createEventHub';
import { GraphGetters } from '@graph/primitives/getters/types';
import type { Prettify } from 'ts-essentials';

import { createCanvasElementFactories } from './canvas-elements.ts';
import { foldPlugins } from './fold-plugins.ts';
import { resolveEdgeComputedTokens } from './render-functions/edge.ts';
import { resolveNodeComputedTokens } from './render-functions/node.ts';
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
  options: coreOptions = {},
}: CreateGraphOptions<TPlugins, PresetName>) => {
  const presetNames = Object.keys(themePresets) as PresetName[];

  let activePresetName = nullThrows(
    presetNames.at(0),
    'createGraph requires at least 1 theme preset!',
  );

  const folded = foldPlugins(
    coreOptions,
    plugins,
    themePresets,
    activePresetName,
  );

  const events = folded.events as EventHub<ExtractEventMap<NoInfer<TPlugins>>>;

  const controls = folded.controls as Prettify<
    ExtractControls<NoInfer<TPlugins>>
  >;

  const actions = folded.actions as GraphActions<
    ExtractActions<NoInfer<TPlugins>>
  >;

  const getters = folded.getters as GraphGetters<
    ExtractGetters<NoInfer<TPlugins>>
  >;

  const { pluginTransitControls } = folded;

  const tokenResolver = createComputedTokenResolver(folded.themeDetectors);

  // assume we have canvas in controls since this is a theme aware orchestrator!
  const castControls = controls as unknown as CoreControls & {
    canvas: CanvasControls;
  };

  const { nodeCanvasElement, edgeCanvasElement } = createCanvasElementFactories(
    castControls,
    tokenResolver,
  );

  const { transformers } = castControls.canvas.aggregator;

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
