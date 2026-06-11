import { Cursor } from '../../../themes/types.ts';
import { CanvasElement } from '../types.ts';

export type GraphTypeToCursor = Partial<
  Record<CanvasElement['graphType'], Cursor>
>;

export type GraphCursor = {};
