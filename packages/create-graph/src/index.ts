import { GraphActions } from '@magic/graph/core/actions/types';
import { core as createCore } from '@magic/graph/core/index';
import { CoreControls } from '@magic/graph/core/types';
import { EventHub } from '@magic/graph/events/createEventHub';
import {
  ExtractActions,
  ExtractControls,
  ExtractEventMap,
  ExtractGetters,
  GraphGetters,
  LooseGraphPlugin,
} from '@magic/graph/plugins/types';
import { GraphSettings } from '@magic/graph/settings/index';
import { Prettify } from '@magic/graph/types';

export const createGraph = <const TPlugins extends LooseGraphPlugin[]>({
  plugins,
  settings = {},
}: {
  plugins: TPlugins;
  settings: Partial<GraphSettings>;
}) => {
  const core = createCore({ settings });

  // TODO add topo sort and explicit error handling for missing plugin dependencies

  let evolvingControls = core.controls;
  let evolvingEvents: any = core.events;
  let evolvingActions = core.actions;
  let evolvingGetters = core.getters;

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
  }

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
  };
};
