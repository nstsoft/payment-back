const StripePayment = require('./stripe');
const PayonnerPayment = require('./payoneer');
const PayPalPayment = require('./paypal');

module.exports = {
  StripePayment,
  PayonnerPayment,
  PayPalPayment,
};
