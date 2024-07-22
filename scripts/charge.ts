import config from '../src/config';
import Stripe from 'stripe';

console.log(config.STRIPE_API_KEY);

const stripe = new Stripe(config.STRIPE_API_KEY, { apiVersion: '2024-06-20' });

const run = async (account) => {
  const charge = await stripe.charges.create({
    amount: 5000, // сумма в центах ($50)
    currency: 'usd',
    source: token.id,
    description: 'Test Charge',
  });

  console.log(charge);
};

run('acct_1PfNVNPav5aWqTAB');
