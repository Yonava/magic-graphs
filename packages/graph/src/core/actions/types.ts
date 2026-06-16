import { GEdge, GNode, UnionToIntersection } from '../../types.ts';
import { Position } from '../positions/types.ts';
import { TransactionPayload } from '../transaction/types.ts';
import { CreateCoreActionOptions } from './createGraphActions.ts';

export type BulkActionConfig = {
  nodes: {};
  edges: {};
  // a special field for options like "add to focus" or "add to history stack" that would
  // be super annoying for the consumer to apply to each node or edge inside the payload
  shared: {};
};

export type BaseActions = {
  addNode: {};
  removeNode: {};

  addEdge: {};
  removeEdge: {};

  addElements: BulkActionConfig;
  removeElements: BulkActionConfig;
};

export type PartialBaseActions = Partial<{
  addNode: {};
  removeNode: {};

  addEdge: {};
  removeEdge: {};

  addElements: Partial<BulkActionConfig>;
  removeElements: Partial<BulkActionConfig>;
}>;

type Id = { id: string };
type SourceTarget = {
  /** id of the source node */
  source: string;
  /** id of the target node */
  target: string;
};

type AddNodeOptions = Partial<Id & Position>;
type AddEdgeOptions = Partial<Id> & SourceTarget;

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

type MockActions = {
  addNode: { mock: string };
  removeNode: {};

  addEdge: {};
  removeEdge: { mock?: string | number };

  addElements: {
    nodes: AddNodeOptions;
    edges: AddEdgeOptions;
    shared: {};
  };
  removeElements: {
    nodes: Partial<Id> & { yona: string };
    edges: Partial<Id>;
    shared: { dila: number };
  };
};

// the secret sauce allowing plugin definitions to omit action fields
// such as addNode or removeEdge if they do not care to extend those
// respective definitions
export type ResolveActions<Actions extends PartialBaseActions> = {
  addNode: 'addNode' extends keyof Actions
    ? NonNullable<Actions['addNode']>
    : {};
  removeNode: 'removeNode' extends keyof Actions
    ? NonNullable<Actions['removeNode']>
    : {};
  addEdge: 'addEdge' extends keyof Actions
    ? NonNullable<Actions['addEdge']>
    : {};
  removeEdge: 'removeEdge' extends keyof Actions
    ? NonNullable<Actions['removeEdge']>
    : {};
  addElements: 'addElements' extends keyof Actions
    ? {
        [K in keyof BulkActionConfig]: K extends keyof Actions['addElements']
          ? Actions['addElements'][K]
          : {};
      }
    : BulkActionConfig;
  removeElements: 'removeElements' extends keyof Actions
    ? {
        [K in keyof BulkActionConfig]: K extends keyof Actions['removeElements']
          ? Actions['removeElements'][K]
          : {};
      }
    : BulkActionConfig;
};

type r = ResolveActions<{
  addNode: { hello: 'world' };
  addElements: { shared: { history: 'id' }; edges: {} };
}>;

// handles distributing union of actions so they can be resolved separately
// before being merged together by UnionToIntersection in MergeActions
type DistributeResolveActions<PartialActions extends PartialBaseActions> =
  PartialActions extends PartialActions
    ? ResolveActions<PartialActions>
    : never;

type BulkActionsField = 'addElements' | 'removeElements';

// takes an array of action shapes and combines them into a single
// interface that is used to type the graph action methods to consumers
export type MergeActions<Actions extends PartialBaseActions[]> =
  Actions extends []
    ? BaseActions
    : {
        [ActionsField in keyof BaseActions]: ActionsField extends BulkActionsField
          ? {
              [ActionsSubField in keyof BaseActions[ActionsField]]: UnionToIntersection<
                DistributeResolveActions<
                  Actions[number]
                >[ActionsField][ActionsSubField]
              >;
            }
          : UnionToIntersection<
              DistributeResolveActions<Actions[number]>[ActionsField]
            >;
      };

type test = MergeActions<[PartialBaseActions]>;
type anotherTest = ResolveActions<PartialBaseActions>;
// const testConst: test['removeElements']['shared'] = {};

type BulkHandler<Action extends BulkActionConfig, ReturnValue> = (
  options: {
    nodes: Action['nodes'][];
    edges: Action['edges'][];
  },
  shared: Action['shared'],
) => ReturnValue;

export type GraphActions<Actions extends BaseActions> = {
  /**
   * Adds a single {@link GNode | node} to the graph. Missing properties get default values.
   * @returns The newly created node instance.
   */
  addNode: (options: Actions['addNode']) => GNode;

  /**
   * Deletes a single {@link GNode | node} from the graph.
   *
   * ℹ️ **Note:** This action implicitly deletes any connected {@link GEdge | edges}.
   * @returns A list of all nodes and edges that were deleted.
   */
  removeNode: (options: Actions['removeNode']) => ElementRemovalPayload;

  /**
   * Adds a single {@link GEdge | edge} connecting two existing {@link GNode | nodes}.
   * @returns The newly created edge instance.
   */
  addEdge: (options: Actions['addEdge']) => GEdge;

  /**
   * Deletes a single {@link GEdge | edge} from the graph.
   * @returns The edge instance that was deleted.
   */
  removeEdge: (options: Actions['removeEdge']) => GEdge['id'];

  /**
   * Bulk adds multiple {@link GNode | nodes} and {@link GEdge | edges}.
   * @returns Lists of all nodes and/or edges that were successfully added.
   */
  addElements: BulkHandler<Actions['addElements'], ElementAdditionPayload>;

  /**
   * Bulk deletes multiple {@link GNode | nodes} and {@link GEdge | edges}.
   *
   * ℹ️ **Note:** If a node is in this batch, all its attached edges get deleted too.
   * @returns Lists of everything that got deleted during the operation.
   */
  removeElements: BulkHandler<Actions['removeElements'], ElementRemovalPayload>;
};

export type ElementRemovalPayload = Pick<
  TransactionPayload,
  'removedNodeIds' | 'removedEdgeIds'
>;

export type ElementAdditionPayload = Pick<
  TransactionPayload,
  'addedNodes' | 'addedEdges'
>;

export type CreateCoreAction<
  ActionName extends keyof GraphActions<CoreActions>,
> = (options: CreateCoreActionOptions) => GraphActions<CoreActions>[ActionName];
