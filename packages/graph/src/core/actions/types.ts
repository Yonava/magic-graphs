import { GEdge, GNode, UnionToIntersection } from '../../types.ts';
import { Position } from '../positions/types.ts';
import { TransactionPayload } from '../transaction/types.ts';

export type BaseActions = {
  addNode: {};
  removeNode: {};

  addEdge: {};
  removeEdge: {};

  addElements: {};
  removeElements: {};
};

export type CoreActions = {
  addNode: Position;
  removeNode: {};

  addEdge: {};
  removeEdge: {};

  addElements: {};
  removeElements: {};
};

// type MockActions = {
//   addNode: { mock: string };
//   removeNode: {};

//   addEdge: {};
//   removeEdge: { mock?: string | number };

//   addElements: {};
//   removeElements: {};
// };

// the secret sauce allowing plugin definitions to omit action fields
// such as addNode or removeEdge if they do not care to extend those
// respective definitions
type ResolveActions<PartialActions extends Partial<BaseActions>> = {
  [ActionsField in keyof BaseActions]: ActionsField extends keyof PartialActions
    ? PartialActions[ActionsField]
    : {};
};

// handles distributing union of actions so they can be resolved separately
// before being merged together by UnionToIntersection in MergeActions
type DistributeResolveActions<PartialActions extends Partial<BaseActions>> =
  PartialActions extends PartialActions
    ? ResolveActions<PartialActions>
    : never;

// takes an array of action shapes and combines them into a single
// interface that is used to type the graph action methods to consumers
export type MergeActions<Actions extends Partial<BaseActions>[]> = {
  [ActionsField in keyof BaseActions]: UnionToIntersection<
    DistributeResolveActions<Actions[number]>[ActionsField]
  >;
};

// type test = MergeActions<[CoreActions, MockActions]>;

// const testConst: test['removeEdge'] = {
//   mock: false
// };

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
  addElements: (options: Actions['addElements']) => ElementAdditionPayload;

  /**
   * Bulk deletes multiple {@link GNode | nodes} and {@link GEdge | edges}.
   *
   * ℹ️ **Note:** If a node is in this batch, all its attached edges get deleted too.
   * @returns Lists of everything that got deleted during the operation.
   */
  removeElements: (options: Actions['removeElements']) => ElementRemovalPayload;
};

export type ElementRemovalPayload = Pick<
  TransactionPayload,
  'removedNodeIds' | 'removedEdgeIds'
>;

export type ElementAdditionPayload = Pick<
  TransactionPayload,
  'addedNodes' | 'addedEdges'
>;
