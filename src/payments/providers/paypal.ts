import paypal from 'paypal-rest-sdk';
import { Payout, PaymentStrategy, Account } from '../interfaces';
import { ApplyCodeActionCommandResult } from 'typescript';

paypal.configure({
  mode: 'sandbox',
  client_id: 'your-paypal-client-id',
  client_secret: 'your-paypal-client-secret',
});

export class PayPalPayout implements Payout<string, 'PAYPAL'> {
  async create(receiver: string, value: number, currency: string = 'USD'): Promise<string> {
    const payout = {
      sender_batch_header: { email_subject: 'You have a payment' },
      items: [
        {
          recipient_type: 'EMAIL',
          amount: { value, currency },
          receiver,
          note: 'Payout note',
          sender_item_id: 'item-1',
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
          resolve('PayPal payment successful');
        }
      });
    });
  }
}
export class PayPalAccount implements Account<number, 'PAYPAL'> {
  async create(email: string): Promise<number> {
    return new Promise((resolve) => {
      return resolve(1);
    });
  }
}

export class PayPalPayment implements PaymentStrategy<string, number, 'PAYPAL'> {
  private payPalPayout: Payout<string, 'PAYPAL'>;
  private payPalAccount: Account<number, 'PAYPAL'>;
  constructor() {
    this.payPalPayout = new PayPalPayout();
    this.payPalAccount = new PayPalAccount();
  }

  get payout() {
    return this.payPalPayout;
  }
  get account() {
    return this.payPalAccount;
  }
}
