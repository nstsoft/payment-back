import express from 'express';
import { PaymentContext, StripePayment, PayPalPayment } from '../payments';

const router = express.Router();

const stripe = new StripePayment();
const paypal = new PayPalPayment();

router.post('/stripe', async (req, res) => {
  console.log(req.body);

  return res.json('payment');
});

export default router;
