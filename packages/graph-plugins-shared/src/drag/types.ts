import type { DeepReadonly } from 'ts-essentials';

export type Coordinate = {
  x: number;
  y: number;
};

export type ActiveDrag<TData extends object> = Coordinate & { data: TData };

type Delta = {
  deltas: {
    dx: number;
    dy: number;
  };
};

export type DragStateControls<TData extends object> = {
  startDrag: (coords: Coordinate, data: TData) => void;
  stopDrag: () => TData | undefined;
  applyMove: (
    newCoords: Coordinate,
  ) => DeepReadonly<Pick<ActiveDrag<TData>, 'data'> & Delta> | undefined;

  isDragging: () => boolean;
  getDragState: () => DeepReadonly<ActiveDrag<TData>> | undefined;

  /** @internal escape hatch to access a writable version of drag data */
  _internals: {
    accessActiveDrag: () => ActiveDrag<TData> | undefined;
  };
};
