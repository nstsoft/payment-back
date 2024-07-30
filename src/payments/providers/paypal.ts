import paypal from 'paypal-rest-sdk';
import config from '../../config';
import { PaymentStrategy } from '../interfaces';

paypal.configure({
  mode: config.PAYPAL_MODE,
  client_id: config.PAYPAL_CLIENT_ID,
  client_secret: config.PAYPAL_CLIENT_SECRET,
});

type Payment = {
  /**
   * Creates a PayPal transfer for a given receiver with the specified amount and currency.
   *
   * @param {string} receiver - The email address of the receiver.
   *
   * @param {Object} options - The options for the payout.
   * @param {string} options.amount - The amount of the payout (in cents).
   * @param {string} [options.currency='USD'] - The currency of the payout. Defaults to 'USD'.
   *
   * @return {Promise<Object>} A promise that resolves to the created payout object.
   */
  createTransfer: (receiver: string, params: { amount: string; currency?: string }) => Promise<unknown>;
};

export class PayPalPayments implements Payment {
  async createTransfer(receiver: string, { amount, currency = 'USD' }: { amount: string; currency?: string }) {
    const value = +amount / 100;
    const payout = {
      sender_batch_header: { email_subject: 'You have a payment' },
      items: [
        {
          recipient_type: 'EMAIL',
          amount: { value: value + '', currency },
          receiver,
          note: 'Payout note',
          sender_item_id: config.PAYPAL_SENDER,
        },
      ],
    };

    return new Promise((resolve, reject) => {
      paypal.payout.create(payout, (error, payout) => (error ? reject(error) : resolve(payout)));
    });
  }
  async create(receiver: string, { amount, currency = 'USD' }): Promise<string> {
    const payout = {
      sender_batch_header: { email_subject: 'You have a payment' },
      items: [
        {
          recipient_type: 'EMAIL',
          amount: { value: amount, currency },
          receiver,
          note: 'Payout note',
          sender_item_id: config.PAYPAL_SENDER,
        },
      ],
    };

    return new Promise((resolve, reject) => {
      paypal.payout.create(payout, (error, payout) => {
        if (error) {
          console.error('PayPal payment failed', error);
          reject(error);
        } else {
          console.log('PayPal payment successful', payout);
          resolve(payout);
        }
      });
    });
  }
}

export class PayPalPayment implements PaymentStrategy<Payment> {
  private payPalPayments: Payment;

  constructor() {
    this.payPalPayments = new PayPalPayments();
  }

  get payments() {
    return this.payPalPayments;
  }
}
