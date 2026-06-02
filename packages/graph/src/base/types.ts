import { MagicCanvasProps } from '@magic/canvas/types';
import { AnimatedShapeControls } from '@magic/shapes/animation/index';

import type { ComputedRef, Ref, ShallowRef } from 'vue';

import { EventHub } from '../events/createEventHub.ts';
import { GraphAtMousePosition } from '../plugins/canvas/types.ts';
import { AggregatorProps } from '../plugins/canvas/useAggregator.ts';
import { GraphSettings } from '../settings/index.ts';
import { ThemeGetter } from '../themes/getThemeResolver.ts';
import { GraphThemeName, ThemeLoadouts } from '../themes/index.ts';
import { FullThemeMap } from '../themes/types.ts';
import type { GEdge, GNode, SchemaItem } from '../types.ts';
import {
  BaseTransactionWrapperOptions,
  GraphActions,
  MergeTransactionWrappersWithBase,
} from './actions/types.ts';
import { GraphCursor } from './cursor/types.ts';
import { BaseEventMap } from './events.ts';
import { PluginHoldController } from './usePluginHold.ts';

export type BaseGraph<
  TransactionWrapperOptions = {},
  EventMap extends BaseEventMap = BaseEventMap,
  Plugins = {},
> = {
  /**
   * all the nodes contained in the graph
   */
  nodes: Ref<GNode[]>;
  /**
   * all the edges contained in the graph
   */
  edges: Ref<GEdge[]>;

  nodeIdToIndex: ComputedRef<Map<GNode['id'], number>>;
  edgeIdToIndex: ComputedRef<Map<GEdge['id'], number>>;

  getNode: (nodeId: GNode['id']) => GNode | undefined;
  getEdge: (edgeId: GEdge['id']) => GEdge | undefined;

  actions: GraphActions<
    MergeTransactionWrappersWithBase<TransactionWrapperOptions>
  >;

  events: EventHub<EventMap>;

  aggregator: AggregatorProps;

  pluginHoldController: PluginHoldController;
  shapes: AnimatedShapeControls;

  baseTheme: ComputedRef<ThemeLoadouts[GraphThemeName]>;
  themeName: Ref<GraphThemeName>;
  getTheme: ThemeGetter;
  themeMap: FullThemeMap;
  settings: Ref<GraphSettings>;

  magicCanvas: MagicCanvasProps;
  /**
   * whether the canvas is currently focused in the browser
   */
  canvasFocused: Ref<boolean>;
  /**
   * whether the canvas is currently hovered by the mouse
   */
  canvasHovered: ShallowRef<boolean>;

  graphAtMousePosition: Ref<GraphAtMousePosition>;
  updateGraphAtMousePosition: () => GraphAtMousePosition;
  cursor: GraphCursor;
} & Plugins;

export type InternalActions = {
  [Action in keyof BaseTransactionWrapperOptions]: (
    ...args: [
      ...Parameters<GraphActions[Action]>,
      transactionOptions: Record<string, any>,
    ]
  ) => ReturnType<GraphActions[Action]>;
};
