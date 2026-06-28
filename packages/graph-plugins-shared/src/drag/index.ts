/** Creates a drag state machine for tracking an active drag with typed payload data. */
export { createDragState } from './internals/createDragState.ts';

/** The controls returned by {@link createDragState} for managing drag lifecycle and reading drag state. */
export type { DragStateControls } from './internals/types.ts';

/** A coordinate pair on the graph canvas. */
export type { Coordinate, ActiveDrag } from './internals/types.ts';
