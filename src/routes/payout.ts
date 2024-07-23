import express from 'express';
import { PaymentContext, StripePayment, PayPalPayment, PayonnerPayment } from '../payments';

const router = express.Router();

const stripe = new StripePayment();
const paypal = new PayPalPayment();
const payoneer = new PayonnerPayment();

const HARDCODED_USER = {
  stripeAccountId: 'acct_1PfNVNPav5aWqTAB',
  payoneerAccountId: 'payoneerAccount',
  paypalAccountId: 'paypalAccount',
};

/* Here You  should implement logig for  authentication
    check  if  requested amount is  less  than available
*/
router.post('/withdraw', async (req, res) => {
  const amount = req.body.amount;

  const paymentContext = new PaymentContext(payoneer);

  // const payment = await paymentContext.payment.withdraw(HARDCODED_USER.stripeAccountId, { amount, currency: 'usd' });
  const payment = await paymentContext.payment.createTransfer(HARDCODED_USER.payoneerAccountId, {
    amount,
    currency: 'USD',
  });
  return res.json(payment);
});

router.post('/account', async (req, res) => {
  const accountBody = req.body;

  const paymentContext = new PaymentContext(stripe);
  const account = await paymentContext.account.create(accountBody);

  return res.json(account);
});

export default router;
