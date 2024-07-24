const paypal = require('paypal-rest-sdk');
const config = require('../../config');

paypal.configure({
  mode: config.PAYPAL_MODE,
  client_id: config.PAYPAL_CLIENT_ID,
  client_secret: config.PAYPAL_CLIENT_SECRET,
});

class PayPalPayments {
  /**
   * Creates a PayPal transfer for a given receiver with the specified amount and currency.
   *
   * @param {string} receiver - The email address of the receiver.
   *
   * @param {Object} options - The options for the payout.
   * @param {number} options.amount - The amount of the payout (in cents).
   * @param {string} [options.currency='USD'] - The currency of the payout. Defaults to 'USD'.
   *
   * @return {Promise<Object>} A promise that resolves to the created payout object.
   */
  async createTransfer(receiver, { amount, currency = 'USD' }) {
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
}

class PayPalPayment {
  payPalPayout;
  payPalPayments;
  constructor() {
    this.payPalPayout = new PayPalPayments();
  }

  get payments() {
    return this.payPalPayments;
  }
}

module.exports = PayPalPayment;
