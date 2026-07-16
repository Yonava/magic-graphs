type Serializable<T> = T extends { toJSON(): infer R }
  ? R
  : T extends RegExp | Date | Function
    ? never // These break or change form during native stringify
    : T extends object
      ? { [K in keyof T]: Serializable<T[K]> }
      : T;

export type TransitControls<PayloadData> = {
  /** convert plugin state into a JSON serializable payload */
  encode: () => Serializable<PayloadData>;
  /** write the payload data into state */
  decode: (data: PayloadData) => void;
  /** inspect and certify that the shape of the data is valid before it is decoded */
  validate: (data: unknown) => boolean;
};
