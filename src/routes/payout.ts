import express from 'express';
import { PaymentContext, StripePayment } from '../payments';

const router = express.Router();

const stripePayment = new StripePayment();

router.post('/withdraw', async (req, res) => {
  const amount = req.body.amount;
  console.log('withdraw');
  const paymentContext = new PaymentContext(stripePayment);
  const payment = await paymentContext.payout.create('eeee', amount, 'usd');
  console.log(payment);
  return res.json('dddd');
});

export default router;
