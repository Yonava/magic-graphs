import { UnionToIntersection } from 'ts-essentials';

import { CoreEventMap } from '../core/events.ts';
import { GraphCoreControls } from '../core/types.ts';
import { EventHub } from '../events/createEventHub.ts';
import { GenericEventMap } from '../events/types.ts';

type LoosePluginData = {
  controls: object;
  events: GenericEventMap;
};

export type GraphPlugin<
  PluginData extends LoosePluginData,
  DependentPluginData extends LooseGraphPlugin[] = [],
> = (
  graph: GraphCoreControls & ExtractControls<DependentPluginData>,
  events: EventHub<CoreEventMap & ExtractEventMap<DependentPluginData>>,
) => {
  controls: PluginData['controls'];
  events: EventHub<CoreEventMap & PluginData['events']>;
};

export type LooseGraphPlugin = (
  graph: GraphCoreControls,
  events: EventHub<CoreEventMap>,
) => {
  controls: LoosePluginData['controls'];
  events: EventHub<LoosePluginData['events']>;
};

export type RemoveArray<T> = T extends (infer F)[] ? F : T;

type ExtractData<TPlugin extends LooseGraphPlugin[]> = UnionToIntersection<
  ReturnType<RemoveArray<NoInfer<TPlugin>>>
>;

export type ExtractControls<TPlugin extends LooseGraphPlugin[]> =
  ExtractData<TPlugin> extends { controls: infer C } ? C : never;

export type ExtractEventMap<TPlugin extends LooseGraphPlugin[]> =
  UnionToIntersection<
    ReturnType<RemoveArray<NoInfer<TPlugin>>> extends {
      events: EventHub<infer E>;
    }
      ? E
      : never
  >;

type MockPlugin = GraphPlugin<{
  controls: { mock: { setMock: () => void; getMock: () => void } };
  events: {
    onMock: () => void;
  };
}>;

type DilaPlugin = GraphPlugin<{
  controls: { dila: { watchAnime: () => void } };
  events: {
    onAnimeWatched: () => void;
  };
}>;

type e = ExtractEventMap<[MockPlugin, DilaPlugin]>;
