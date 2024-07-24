'use strict';
require('dotenv/config');
var config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  STRIPE_API_KEY: process.env.STRIPE_API_KEY || '',
  PAYPAL_MODE: process.env.PAYPAL_MODE || '',
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || '',
  PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET || '',
  PAYPAL_SENDER: process.env.PAYPAL_SENDER || '',
  STRIPE_REFRESH_URL: process.env.STRIPE_REFRESH_URL || '',
  STRIPE_RETURN_URL: process.env.STRIPE_RETURN_URL || '',
  PAYONEER_CLIENT_ID: process.env.PAYONEER_CLIENT_ID || '',
  PAYONEER_CLIENT_SECRET: process.env.PAYONEER_CLIENT_SECRET || '',
  PAYONEER_AUTH_URL: process.env.PAYONEER_AUTH_URL || '',
  PAYONEER_API_URL: process.env.PAYONEER_API_URL || '',
  PAYONEER_SCOPES: process.env.PAYONEER_SCOPES || '',
  PAYONEER_PROGRAM_ID: process.env.PAYONEER_PROGRAM_ID || '',
  PAYONEER_REDIRECT_URL: process.env.PAYONEER_REDIRECT_URL || '',
};

module.exports = config;
