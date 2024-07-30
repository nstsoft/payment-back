export type PayoutType = {
  payee_id: string;
  description: string;
  currency: string;
  amount: number;
  client_reference_id?: string;
};

export type CreateAccountLinkData = {
  payee_id: string;
  client_session_id: string;
  redirect_url: string;
  redirect_time: string;
  lock_type: string;
  tax_lock_type: string;
  payee_data_matching_type: string;
  already_have_an_account: boolean;
  payee: { type: string; contact: { email: string } };
};
