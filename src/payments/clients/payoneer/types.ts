export type PayoutType = {
  payee_id: string;
  description: string;
  currency: string;
  amount: number;
  client_reference_id?: string;
};
