import express from 'express';
import { PaymentContext, StripePayment, PayPalPayment, PayoneerPayment } from '../payments';

const router = express.Router();

const stripe = new StripePayment();
const paypal = new PayPalPayment();
const payoneer = new PayoneerPayment();

const HARDCODED_USER = {
  stripeAccountId: 'acct_1Pm8CpQFkObjjrxl',
  payoneerAccountId: 'snoops.co-buyer@gmail.com',
  paypalAccountId: 'snoops.co-buyer@gmail.com',
};

/* Here You  should implement logig for  authentication
    check  if  requested amount is  less  than available
*/
router.post('/withdraw', async (req, res) => {
  const amount = req.body.amount;

  const paymentContext = new PaymentContext(stripe);

  // const payment = await paymentContext.payment.withdraw(HARDCODED_USER.stripeAccountId, { amount, currency: 'usd' });
  const payment = await paymentContext.payment.createTransfer(HARDCODED_USER.stripeAccountId, {
    amount,
    currency: 'USD',
  });
  return res.json(payment);
});

router.post('/account', async (req, res) => {
  const accountBody = req.body;

  console.log(accountBody);

  const paymentContext = new PaymentContext(stripe);
  const account = await paymentContext.account.onboard({});

  return res.json(account);
});

export default router;
