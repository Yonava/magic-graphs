import { CoreActions } from '@graph/core/actions/types';
import { CoreEventMap } from '@graph/core/events';
import { CoreGetters } from '@graph/core/getters';
import { CoreControls, CoreTransitPayload } from '@graph/core/types';
import { GraphActions } from '@graph/primitives/actions/types';
import { EventHub } from '@graph/primitives/events/createEventHub';
import { BaseGetters } from '@graph/primitives/getters/types';
import { StructuralEventMap } from '@graph/primitives/transactions/types';
import { TransitControls } from '@graph/primitives/transit/types';
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

type ResolveTransitPayload<Plugin extends LooseGraphPlugin> =
  Plugin extends Plugin
    ? ReturnType<Plugin> extends {
        name: infer Name extends string;
        transit: TransitControls<infer PayloadData>;
      }
      ? Record<Name, PayloadData>
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
    ? // all plugins come pre-baked with core events, plus the structural events
      // create-graph merges in before folding begins
      CoreEventMap & StructuralEventMap
    : UnionToIntersection<
        ReturnType<RemoveArray<NoInfer<TPlugins>>> extends {
          events: EventHub<infer EventMap>;
        }
          ? EventMap
          : never
      >;

export type ExtractTransitPayload<TPlugins extends LooseGraphPlugin[]> = Record<
  'core',
  CoreTransitPayload
> &
  (TPlugins extends never[]
    ? {}
    : UnionToIntersection<
        ResolveTransitPayload<RemoveArray<NoInfer<TPlugins>>>
      >);
