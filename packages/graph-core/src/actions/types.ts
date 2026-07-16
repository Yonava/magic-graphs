import { GraphActions } from '@graph/primitives/actions/types';
import Fraction from 'fraction.js';

import { Position as NodePosition } from '../positions/types.ts';
import { CreateCoreActionOptions } from './createCoreActions.ts';

export type CreateCoreAction<
  ActionName extends keyof GraphActions<CoreActions>,
> = (options: CreateCoreActionOptions) => GraphActions<CoreActions>[ActionName];

type Id = { id: string };
type Weight = { weight?: Fraction };
type Position = { position?: Partial<NodePosition> };
type SourceTarget = {
  /** id of the source node */
  source: string;
  /** id of the target node */
  target: string;
};

type AddNodeOptions = Partial<Id> & Position;
type AddEdgeOptions = Partial<Id> & SourceTarget & Weight;

// TODO remove handlers may need to be another "special" case!
// Examine how annoying it is to call remove handlers like:
// graph.actions.removeNode({ id: '123' })
// vs.
// graph.actions.removeNode('123')
export type CoreActions = {
  addNode: AddNodeOptions;
  removeNode: Id;

  addEdge: AddEdgeOptions;
  removeEdge: Id;

  addElements: {
    nodes: AddNodeOptions;
    edges: AddEdgeOptions;
    shared: {};
  };
  removeElements: {
    nodes: Id;
    edges: Id;
    shared: {};
  };
};
