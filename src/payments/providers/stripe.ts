import { PaymentStrategy, Payout } from '../interfaces';
import { User } from '../../utils';
import Stripe from 'stripe';

const stripe = new Stripe('your-stripe-secret-key', { apiVersion: '2024-06-20' });

export class StripePayout implements Payout {
  async create(recipient: string, amount: number, currency: string = 'usd'): Promise<Stripe.Response<Stripe.Transfer>> {
    console.log({ recipient, amount, currency });
    try {
      const payout = await stripe.transfers.create({
        amount: amount * 100, // Stripe expects amounts in cents
        currency: currency,
        destination: recipient,
      });
      return payout;
      console.log('Stripe payment successful');
    } catch (error) {
      console.error('Stripe payment failed', error);
    }
  }
}

export class StripePayment implements PaymentStrategy {
  private stripePayout: Payout;
  constructor() {
    this.stripePayout = new StripePayout();
  }

  get payout() {
    return this.stripePayout;
  }
}
