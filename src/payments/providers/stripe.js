const config = require('../../config');
const Stripe = require('stripe');

const stripe = new Stripe(config.STRIPE_API_KEY, { apiVersion: '2024-06-20' });

class StripePayments {
  /**
   * Creates a transfer to the specified destination(account) with the given amount and currency.
   *
   * @param {string} destination - The destination for the transfer.
   *
   * @param {Object} options - The options for the transfer.
   * @param {number} options.amount - The amount to transfer(in cents).
   * @param {string} [options.currency='usd'] - The currency of the transfer. Defaults to 'usd'.
   *
   * @return {Promise<Stripe.Response<Stripe.Transfer>>} A promise that resolves to the Stripe transfer response.
   */
  createTransfer(destination, { amount, currency = 'usd' }) {
    return stripe.transfers.create({ destination, amount, currency: currency });
  }
  /**
   * Creates a payout for the specified stripe account with the given amount and currency.
   *
   * @param {string} stripeAccount - The ID of the stripe account.
   *
   * @param {Object} options - The options for the payout.
   * @param {string} options.amount - The amount of the payout(in cents).
   * @param {string} [options.currency='usd'] - The currency of the payout. Defaults to 'usd'.
   *
   * @return {Promise<Stripe.Response<Stripe.Payout>>} A promise that resolves to the Stripe payout response.
   */
  async createPayout(stripeAccount, { amount, currency = 'usd' }) {
    return stripe.payouts.create({ amount: amount, currency: currency }, { stripeAccount });
  }

  /**
   * Withdraws the specified amount from the destination account.
   * firstly creates transfer than payout
   *
   * @param {string} destination - The destination account ID.
   *
   * @param {Object} options - The options for the withdrawal.
   * @param {string} options.amount - The amount to withdraw.
   * @param {string} [options.currency='usd'] - The currency of the withdrawal. Defaults to 'usd'.
   *
   * @return {Promise<Stripe.Response<Stripe.Payout>>} A promise that resolves to the Stripe payout response.
   */
  async withdraw(destination, { amount, currency = 'usd' }) {
    await this.createTransfer(destination, { amount, currency });
    return stripe.payouts.create({ amount: amount, currency: currency }, { stripeAccount: destination });
  }
}

class StripeAccount {
  async onboard(data) {
    const account = await stripe.accounts.create({
      ...data,
      // country: 'US',
      controller: {
        stripe_dashboard: { type: 'none' },
        fees: { payer: 'application' },
        losses: { payments: 'application' },
        requirement_collection: 'application',
      },
      capabilities: { transfers: { requested: true } },
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
  /**
   * Creates an account link for the given account for further onboarding
   *
   * @param {string} account - The ID of the account for which to create the account link.
   * @return {Promise<Stripe.Response<Stripe.AccountLink>>} A promise that resolves to the Stripe account link response.
   */
  async createAccountLink(account) {
    return stripe.accountLinks.create({
      account,
      refresh_url: config.STRIPE_REFRESH_URL,
      return_url: config.STRIPE_RETURN_URL,
      type: 'account_onboarding',
    });
  }
}

class StripePayment {
  stripePayments;
  stripeAccount;

  constructor() {
    this.stripePayments = new StripePayments();
    this.stripeAccount = new StripeAccount();
  }

  get payments() {
    return this.stripePayments;
  }

  get account() {
    return this.stripeAccount;
  }
}

module.exports = StripePayment;
