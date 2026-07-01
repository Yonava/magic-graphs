import { CoreActions } from '@magic/graph-core/actions/types';
import { CoreEventMap } from '@magic/graph-core/events';
import { CoreGetters } from '@magic/graph-core/getters';
import { CoreControls } from '@magic/graph-core/types';
import { GraphActions } from '@magic/graph-primitives/actions/types';
import { EventHub } from '@magic/graph-primitives/events/createEventHub';
import { BaseGetters } from '@magic/graph-primitives/getters/types';
import { UnionToIntersection } from 'ts-essentials';

import { LooseGraphPlugin } from './loose.ts';

type RemoveArray<T> = T extends (infer F)[] ? F : T;

type ResolveControls<Plugin extends LooseGraphPlugin> = Plugin extends Plugin
  ? ReturnType<Plugin> extends {
      name: infer Name extends string;
      controls: infer Controls;
    }
    ? Record<Name, Controls>
    : never
  : never;

export type ExtractControls<TPlugins extends LooseGraphPlugin[]> =
  CoreControls &
    (TPlugins extends never[]
      ? {}
      : UnionToIntersection<ResolveControls<RemoveArray<NoInfer<TPlugins>>>>);

export type ExtractActions<TPlugins extends LooseGraphPlugin[]> =
  TPlugins extends never[]
    ? // all plugins come pre-baked with core actions
      CoreActions
    : UnionToIntersection<
        ReturnType<RemoveArray<NoInfer<TPlugins>>> extends {
          actions: GraphActions<infer Actions>;
        }
          ? Actions
          : never
      >;

type GettersFromPlugin<Plugin extends LooseGraphPlugin> =
  Plugin extends LooseGraphPlugin
    ? {
        getNode: ReturnType<ReturnType<Plugin>['getters']['getNode']>;
        getEdge: ReturnType<ReturnType<Plugin>['getters']['getEdge']>;
      }
    : never;

export type ExtractGetters<TPlugins extends LooseGraphPlugin[]> =
  TPlugins extends never[]
    ? // all plugins come pre-baked with core getters
      CoreGetters
    : {
        [K in keyof BaseGetters]: UnionToIntersection<
          GettersFromPlugin<RemoveArray<NoInfer<TPlugins>>>[K]
        >;
      };

export type ExtractEventMap<TPlugins extends LooseGraphPlugin[]> =
  TPlugins extends never[]
    ? // all plugins come pre-baked with core events
      CoreEventMap
    : UnionToIntersection<
        ReturnType<RemoveArray<NoInfer<TPlugins>>> extends {
          events: EventHub<infer EventMap>;
        }
          ? EventMap
          : never
      >;
