import paypal from 'paypal-rest-sdk';
import config from '../../config';
import { PaymentStrategy } from '../interfaces';

paypal.configure({
  mode: config.PAYAPAL_MODE,
  client_id: config.PAYPAL_CLIENT_ID,
  client_secret: config.PAYPAL_CLIENT_SECRET,
});

type Payout = {
  create: (receiver: string, params: { amount: number; currency?: string }) => Promise<unknown>;
};
type Account = {
  create: (email: string) => Promise<unknown>;
};

export class PayPalPayout implements Payout {
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
export class PayPalAccount implements Account {
  async create(email: string): Promise<number> {
    return new Promise((resolve) => {
      return resolve(1);
    });
  }
}

export class PayPalPayment implements PaymentStrategy<Payout, Account> {
  private payPalPayout: Payout;
  private payPalAccount: Account;
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
