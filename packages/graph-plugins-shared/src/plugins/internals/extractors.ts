import { CoreActions } from '@graph/core/actions/types';
import { CoreGetters } from '@graph/core/getters';
import { CoreControls, CoreTransitPayload } from '@graph/core/types';
import { GraphActions } from '@graph/primitives/actions/types';
import { BaseGetters, GraphGetters } from '@graph/primitives/getters/types';
import { TransitControls } from '@graph/primitives/transit/types';
import { IsNever, UnionToIntersection } from 'ts-essentials';

import { LooseGraphPlugin } from './loose.ts';

type RemoveArray<T> = T extends (infer F)[] ? F : T;

// core is folded in here rather than taken from the plugins, since a plugin declaring no
// controls, actions or getters of its own leaves that field off its output entirely
type MergeIntoCore<Core, Contributions> =
  // UnionToIntersection resolves an empty union to never, which would wipe out core
  IsNever<Contributions> extends true
    ? Core
    : Core & UnionToIntersection<Contributions>;

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
  MergeIntoCore<CoreControls, ResolveControls<RemoveArray<NoInfer<TPlugins>>>>;

type ActionsFromPlugin<Plugin extends LooseGraphPlugin> = Plugin extends Plugin
  ? ReturnType<Plugin> extends { actions: GraphActions<infer Actions> }
    ? Actions
    : never
  : never;

export type ExtractActions<TPlugins extends LooseGraphPlugin[]> = MergeIntoCore<
  CoreActions,
  ActionsFromPlugin<RemoveArray<NoInfer<TPlugins>>>
>;

type GettersFromPlugin<Plugin extends LooseGraphPlugin> = Plugin extends Plugin
  ? ReturnType<Plugin> extends {
      getters: infer Getters extends GraphGetters<any>;
    }
    ? {
        getNode: ReturnType<Getters['getNode']>;
        getEdge: ReturnType<Getters['getEdge']>;
      }
    : never
  : never;

export type ExtractGetters<TPlugins extends LooseGraphPlugin[]> = {
  [GettersField in keyof BaseGetters]: MergeIntoCore<
    CoreGetters[GettersField],
    GettersFromPlugin<RemoveArray<NoInfer<TPlugins>>>[GettersField]
  >;
};

export type ExtractTransitPayload<TPlugins extends LooseGraphPlugin[]> = Record<
  'core',
  CoreTransitPayload
> &
  (TPlugins extends never[]
    ? {}
    : UnionToIntersection<
        ResolveTransitPayload<RemoveArray<NoInfer<TPlugins>>>
      >);
