const StripePayment = require('./stripe');
const PayoneerPayment = require('./payoneer');
const PayPalPayment = require('./paypal');

module.exports = {
  StripePayment,
  PayoneerPayment,
  PayPalPayment,
};
