import config from '../../config';
import Payoneer from '../clients/payoneer';
import { PaymentStrategy } from '../interfaces';

const payoneer = new Payoneer({ clientId: config.PAYONEER_CLIENT_ID, clientSecret: config.PAYONEER_CLIENT_SECRET });

type Payout = {
  /**
   * Create payoneer transfer (transfer to payoneer account)
   *
   * @param {string} payee_id - The ID of the payee
   * @param {{ amount: number; currency?: string }} params - An object containing the amount and optional currency
   * @param {{ description?: string; client_reference_id?: string }} meta - An object containing optional description and client reference ID
   * @return {Promise<{ result: 'Payments Created' }>}} A Promise resolving to a result indicating 'Payments Created'
   */
  createTransfer: (
    payee_id: string,
    params: { amount: number; currency?: string },
    meata?: { description?: string; client_reference_id?: string },
  ) => Promise<{ result: 'Payments Created' }>;
};

export class PayoneerPayout implements Payout {
  async createTransfer(
    payee_id: string,
    params: { amount: number; currency?: string },
    meta?: { description?: string; client_reference_id?: string },
  ) {
    return payoneer.payments.payout.create({
      payee_id,
      amount: params.amount,
      currency: params.currency ?? 'USD',
      description: meta?.description ?? '',
      client_reference_id: meta?.client_reference_id ?? '',
    });
  }
}

export class PayonnerPayment implements PaymentStrategy<Payout, undefined> {
  private payoneerPayout: Payout;

  constructor() {
    this.payoneerPayout = new PayoneerPayout();
  }

  get payments() {
    return this.payoneerPayout;
  }

  get account() {
    return undefined;
  }
}
