import { PaymentStrategy } from '../interfaces';
import config from '../../config';
import Stripe from 'stripe';

const stripe = new Stripe(config.STRIPE_API_KEY, { apiVersion: '2024-06-20' });

type Payout = {
  create: (
    receiver: string,
    params: { amount: number; currency?: string },
  ) => Promise<Stripe.Response<Stripe.Transfer>>;
};
type Account = {
  create: () => Promise<unknown>;
};

export class StripePayout implements Payout {
  create(recipient: string, { amount, currency = 'usd' }): Promise<Stripe.Response<Stripe.Transfer>> {
    return stripe.transfers.create({
      amount: amount * 100, // Stripe expects amounts in cents
      currency: currency,
      destination: recipient,
    });
  }
}

export class StripeAccount implements Account {
  create() {
    return stripe.accounts.create({
      controller: {
        losses: { payments: 'application' },
        fees: { payer: 'application' },
        stripe_dashboard: { type: 'express' },
      },
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

  get payout() {
    return this.stripePayout;
  }

  get account() {
    return this.stripeAccount;
  }
}
