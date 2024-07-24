const express = require('express');
const { PaymentContext, StripePayment, PayPalPayment } = require('../payments');

const router = express.Router();

const stripe = new StripePayment();
const paypal = new PayPalPayment();

router.post('/stripe', async (req, res) => {
  console.log(req.body);

  return res.json('payment');
});

module.exports = router;
