export type TransitControls<PayloadData> = {
  encode: () => PayloadData;
  decode: (data: PayloadData) => void;
  validate: (data: PayloadData) => boolean;
};
