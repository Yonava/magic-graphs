import { AnyFunction } from 'ts-essentials';

import { BaseGraphEventMap } from './types.ts';

export type GenericEventMap = Record<string, AnyFunction>;

export type EventMapToEventBus<EventMap extends GenericEventMap> = {
  [EventName in keyof EventMap]: Set<EventMap[EventName]>;
};

export type BaseGraphEventBus = EventMapToEventBus<BaseGraphEventMap>;

export const createBaseGraphEventBus = (): BaseGraphEventBus => ({
  onTransactionComplete: new Set(),
  onStructureChange: new Set(),

  onNodeAdded: new Set(),
  onNodeRemoved: new Set(),
  onNodeUpdated: new Set(),

  onEdgeAdded: new Set(),
  onEdgeRemoved: new Set(),
  onEdgeUpdated: new Set(),

  onElementsAdded: new Set(),
  onElementsRemoved: new Set(),
  onElementsUpdated: new Set(),

  onDraw: new Set(),
  onNodeHoverChange: new Set(),

  onClick: new Set(),
  onMouseDown: new Set(),
  onMouseUp: new Set(),
  onMouseMove: new Set(),
  onDblClick: new Set(),
  onContextMenu: new Set(),

  onKeyDown: new Set(),
  onKeyUp: new Set(),

  onThemeChange: new Set(),
  onSettingsChange: new Set(),
});
