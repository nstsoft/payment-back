import config from '../src/config';
import Stripe from 'stripe';

console.log(config.STRIPE_API_KEY);

const stripe = new Stripe(config.STRIPE_API_KEY, { apiVersion: '2024-06-20' });

const run = async (account) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2000, // сумма в центах ($20)
    currency: 'usd',
    payment_method_data: {
      type: 'card',
      card: { token: 'tok_visa' },
    },
    on_behalf_of: account,
    transfer_data: {
      destination: account,
    },
    return_url: 'https://example.com',
    confirm: true,
  });

  console.log(paymentIntent);
};

run('acct_1PfNVNPav5aWqTAB');
