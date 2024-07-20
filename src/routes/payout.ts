import express from 'express';
import { PaymentContext, StripePayment, PayPalPayment } from '../payments';

const router = express.Router();

const stripe = new StripePayment();
const paypal = new PayPalPayment();

router.post('/withdraw', async (req, res) => {
  const amount = req.body.amount;
  console.log('withdraw');
  const paymentContext = new PaymentContext(paypal);
  const payment = await paymentContext.payout.create('eeee', amount, 'usd');
  const account = await paymentContext.account.create();

  console.log({ payment, account });
  return res.json(payment);
});

export default router;
