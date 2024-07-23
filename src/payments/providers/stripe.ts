import { PaymentStrategy } from '../interfaces';
import config from '../../config';
import Stripe from 'stripe';
import { StripeConnectedAccount } from '../../utils';

const stripe = new Stripe(config.STRIPE_API_KEY, { apiVersion: '2024-06-20' });

type Payout = {
  /**
   * Creates a transfer to the specified destination(account) with the given amount and currency.
   *
   * @param {string} destination - The destination for the transfer.
   * @param {Object} options - The options for the transfer.
   * @param {number} options.amount - The amount to transfer.
   * @param {string} [options.currency='usd'] - The currency of the transfer. Defaults to 'usd'.
   * @return {Promise<Stripe.Response<Stripe.Transfer>>} A promise that resolves to the Stripe transfer response.
   */
  createTransfer: (
    receiver: string,
    params: { amount: number; currency?: string },
  ) => Promise<Stripe.Response<Stripe.Transfer>>;
  /**
   * Creates a payout for the specified stripe account with the given amount and currency.
   *
   * @param {string} stripeAccount - The ID of the stripe account.
   * @param {Object} options - The options for the payout.
   * @param {string} options.amount - The amount of the payout.
   * @param {string} [options.currency='usd'] - The currency of the payout. Defaults to 'usd'.
   * @return {Promise<Stripe.Response<Stripe.Payout>>} A promise that resolves to the Stripe payout response.
   */
  createPayout(
    stripeAccount: string,
    params: { amount: string; currency?: string },
  ): Promise<Stripe.Response<Stripe.Payout>>;
  /**
   * Withdraws the specified amount from the destination account.
   *
   * @param {string} destination - The destination account ID.
   * @param {Object} options - The options for the withdrawal.
   * @param {number} options.amount - The amount to withdraw.
   * @param {string} [options.currency='usd'] - The currency of the withdrawal. Defaults to 'usd'.
   * @return {Promise<Stripe.Response<Stripe.Payout>>} A promise that resolves to the Stripe payout response.
   */
  withdraw(
    stripeAccount: string,
    params: { amount: string; currency?: string },
  ): Promise<Stripe.Response<Stripe.Payout>>;
};

type Account = {
  create: (
    data: Partial<StripeConnectedAccount>,
  ) => Promise<{ account: Stripe.Response<Stripe.Account>; link: Stripe.Response<Stripe.AccountLink> }>;
  createAccountLink: (account: string) => Promise<Stripe.Response<Stripe.AccountLink>>;
};

export class StripePayout implements Payout {
  createTransfer(destination: string, { amount, currency = 'usd' }): Promise<Stripe.Response<Stripe.Transfer>> {
    return stripe.transfers.create({
      destination,
      amount: amount * 100,
      currency: currency,
    });
  }

  async createPayout(stripeAccount: string, { amount, currency = 'usd' }): Promise<Stripe.Response<Stripe.Payout>> {
    return stripe.payouts.create({ amount: amount, currency: currency }, { stripeAccount });
  }

  async withdraw(destination: string, { amount, currency = 'usd' }): Promise<Stripe.Response<Stripe.Payout>> {
    await this.createTransfer(destination, { amount, currency });
    return stripe.payouts.create({ amount: amount, currency: currency }, { stripeAccount: destination });
  }
}

export class StripeAccount implements Account {
  async create(data: Partial<Stripe.AccountCreateParams>) {
    const account = await stripe.accounts.create({
      ...data,
      // country: 'US',
      controller: {
        stripe_dashboard: { type: 'none' },
        fees: { payer: 'application' },
        losses: { payments: 'application' },
        requirement_collection: 'application',
      },
      capabilities: {
        transfers: { requested: true },
      },
      tos_acceptance: { service_agreement: 'recipient' },
    });

    const link = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: config.STRIPE_REFRESH_URL,
      return_url: config.STRIPE_RETURN_URL,
      type: 'account_onboarding',
    });

    return { link, account };
  }
  async createAccountLink(account: string) {
    return stripe.accountLinks.create({
      account,
      refresh_url: config.STRIPE_REFRESH_URL,
      return_url: config.STRIPE_RETURN_URL,
      type: 'account_onboarding',
    });
  }
}

export class StripePayment implements PaymentStrategy<Payout, Account> {
  private stripePayout: Payout;
  private stripeAccount: Account;

  constructor() {
    this.stripePayout = new StripePayout();
    this.stripeAccount = new StripeAccount();
  }

  get payments() {
    return this.stripePayout;
  }

  get account() {
    return this.stripeAccount;
  }
}
