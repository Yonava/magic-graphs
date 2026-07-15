export type GraphTransit<PayloadData> = {
  encode: () => PayloadData;
  decode: (data: PayloadData) => void;
};
