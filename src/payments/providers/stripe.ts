import { PaymentStrategy, Payout, Account, STRATEGY } from '../interfaces';
import Stripe from 'stripe';

const stripe = new Stripe('your-stripe-secret-key', { apiVersion: '2024-06-20' });

export class StripePayout implements Payout<Stripe.Response<Stripe.Transfer>, 'STRIPE'> {
  create(recipient: string, amount: number, currency: string = 'usd'): Promise<Stripe.Response<Stripe.Transfer>> {
    return stripe.transfers.create({
      amount: amount * 100, // Stripe expects amounts in cents
      currency: currency,
      destination: recipient,
    });
  }
}

export class StripeAccount implements Account<Stripe.Response<Stripe.Account>, 'STRIPE'> {
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

export class StripePayment
  implements PaymentStrategy<Stripe.Response<Stripe.Transfer>, Stripe.Response<Stripe.Account>, STRATEGY>
{
  private stripePayout: Payout<Stripe.Response<Stripe.Transfer>, 'STRIPE'>;
  private stripeAccount: Account<Stripe.Response<Stripe.Account>, 'STRIPE'>;
  strategy: STRATEGY = 'STRIPE';
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
