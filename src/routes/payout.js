const express = require('express');
const { PaymentContext, StripePayment, PayPalPayment, PayonnerPayment } = require('../payments');
const router = express.Router();
const stripe = new StripePayment();
const paypal = new PayPalPayment();
const payoneer = new PayonnerPayment();

const HARDCODED_USER = {
  stripeAccountId: 'acct_1PfNVNPav5aWqTAB',
  payoneerAccountId: 'payoneerAccount',
  paypalAccountId: 'paypalAccount',
};

router.post('/withdraw', async (req, res) => {
  const amount = req.body.amount;

  const paymentContext = new PaymentContext(payoneer);
  try {
    // const payment = await paymentContext.payment.createTransfer(HARDCODED_USER.payoneerAccountId, {
    //   amount,
    //   currency: 'USD',
    // });
    const payment = await paymentContext.payment.createTransfer(HARDCODED_USER.payoneerAccountId, {
      amount,
      currency: 'USD',
    });
    return res.json(payment);
  } catch (error) {
    res.status(error.status || 500).json(error);
  }

  // const payment = await paymentContext.payment.withdraw(HARDCODED_USER.stripeAccountId, { amount, currency: 'usd' });
});

router.post('/account', async (req, res) => {
  const accountBody = req.body;

  try {
    const paymentContext = new PaymentContext(payoneer);
    const account = await paymentContext.account.onboard(accountBody);
    return res.json(account);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json(error);
  }
});

module.exports = router;
