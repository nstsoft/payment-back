import express from 'express';
import { PaymentContext, StripePayment, PayPalPayment } from '../payments';

const router = express.Router();

const stripe = new StripePayment();
const paypal = new PayPalPayment();

const HARDCODED_USER = {
  stripeAccountId: 'acct_1PfNVNPav5aWqTAB',
};

/* Here You  should implement logig for  authentication
    check  if  requested amount is  less  than available
*/
router.post('/withdraw', async (req, res) => {
  const amount = req.body.amount;

  const paymentContext = new PaymentContext(stripe);

  const payment = await paymentContext.payout.withdraw(HARDCODED_USER.stripeAccountId, { amount, currency: 'usd' });
  return res.json(payment);
});

router.post('/account', async (req, res) => {
  const accountBody = req.body;

  const paymentContext = new PaymentContext(stripe);
  const account = await paymentContext.account.create(accountBody);

  return res.json(account);
});

export default router;
