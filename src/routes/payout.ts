import express from 'express';
import { PaymentContext, StripePayment, PayPalPayment } from '../payments';

const router = express.Router();

const stripe = new StripePayment();
const paypal = new PayPalPayment();

router.post('/withdraw', async (req, res) => {
  const amount = req.body.amount;
  console.log('withdraw');
  const paymentContext = new PaymentContext(stripe);
  const payment = await paymentContext.payout.create('receiver', { amount, currency: 'usd' });
  const account = await paymentContext.account.create();

  console.log({ account, payment });
  return res.json(account);
});

export default router;
