import type { Fraction } from 'mathjs';
import { UnionToIntersection } from 'ts-essentials';

import { CoreEdge, CoreNode } from '../types.ts';

export type BaseGetters = {
  getNode: {};
  getEdge: {};
};

export type CoreGetters = {
  getNode: CoreNode;
  getEdge: CoreEdge & { weight: Fraction };
};

export type ResolveGetters<Getters extends Partial<BaseGetters>> = {
  getNode: 'getNode' extends keyof Getters
    ? NonNullable<Getters['getNode']>
    : {};
  getEdge: 'getEdge' extends keyof Getters
    ? NonNullable<Getters['getEdge']>
    : {};
};

type DistributeResolveGetters<PartialGetters extends Partial<BaseGetters>> =
  PartialGetters extends PartialGetters
    ? ResolveGetters<PartialGetters>
    : never;

export type MergeGetters<Getters extends Partial<BaseGetters>[]> =
  Getters extends []
    ? BaseGetters
    : {
        [GettersField in keyof BaseGetters]: UnionToIntersection<
          DistributeResolveGetters<Getters[number]>[GettersField]
        >;
      };

export type GraphGetters<Getters extends BaseGetters> = {
  getNode: (nodeId: string) => Getters['getNode'];
  getEdge: (edgeId: string) => Getters['getEdge'];
};
