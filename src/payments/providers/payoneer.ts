import config from '../../config';
import Payoneer from '../clients/payoneer';
import { PaymentStrategy } from '../interfaces';
import uuid from 'uuid4';

const payoneer = new Payoneer({ clientId: config.PAYONEER_CLIENT_ID, clientSecret: config.PAYONEER_CLIENT_SECRET });

type Payment = {
  /**
   * Create payoneer transfer (transfer to payoneer account)
   *
   * @param {string} payee_id - The ID of the payee
   *
   * @param {Object} params  An object containing the amount(in cents) and optional currency.
   * @param {string} params.amount - The amount of the payout.
   * @param {string} [params.currency='USD'] - The currency of the payout. Defaults to 'USD'.
   *
   * @param {Object} meta  An object containing optional description and client reference ID.
   * @param {string} [meta.description] - The amount of the payout.
   * @param {string} meta.client_reference_id - The amount of the payout.
   *
   * @return {Promise<{ result: 'Payments Created' }>}} A Promise resolving to a result indicating 'Payments Created'
   */
  createTransfer: (
    payee_id: string,
    params: { amount: string; currency?: string },
    meata?: { description?: string; client_reference_id?: string },
  ) => Promise<{ result: 'Payments Created' }>;
};

type Account = {
  /**
   * Payee onboarding (create account).
   *
   * @param {Object} data - The data used to create the account.
   * @param {boolean} data.haveAnAccount - Whether the user already has an account.
   * @param {string} data.email - The email of the user.
   *
   * @return {Promise<Object>} A promise that resolves to the created account object.
   */
  onboard(data: { haveAnAccount: boolean; email: string }): Promise<{
    token: string;
    registration_link: string;
  }>;
};

export class PayoneerPayments implements Payment {
  async createTransfer(
    payee_id: string,
    params: { amount: string; currency?: string },
    meta?: { description?: string; client_reference_id?: string },
  ) {
    return payoneer.payments.payout.create({
      payee_id,
      amount: +params.amount,
      currency: params.currency ?? 'USD',
      description: meta?.description ?? '',
      client_reference_id: meta?.client_reference_id ?? '',
    });
  }
}

class PayoneerAccount implements Account {
  onboard(data: { haveAnAccount: boolean; email: string }) {
    return payoneer.account.create({
      payee_id: uuid(),
      client_session_id: uuid(),
      redirect_url: config.PAYONEER_REDIRECT_URL,
      redirect_time: '5',
      lock_type: 'ALL',
      tax_lock_type: '',
      payee_data_matching_type: 'COI_ID',
      already_have_an_account: data.haveAnAccount,
      payee: { type: 'Individual', contact: { email: data.email } },
    });
  }
}

export class PayoneerPayment implements PaymentStrategy<Payment, Account> {
  private payoneerPayments: Payment;
  private payoneerAccount: Account;

  constructor() {
    this.payoneerPayments = new PayoneerPayments();
    this.payoneerAccount = new PayoneerAccount();
  }

  get payments() {
    return this.payoneerPayments;
  }

  get account() {
    return this.payoneerAccount;
  }
}
