import 'dotenv/config';

interface Config {
  port: number;
  STRIPE_API_KEY: string;
  STRIPE_REFRESH_URL: string;
  STRIPE_RETURN_URL: string;
  PAYPAL_MODE: string;
  PAYPAL_CLIENT_ID: string;
  PAYPAL_CLIENT_SECRET: string;
  PAYPAL_SENDER: string;
  PAYONEER_CLIENT_ID: string;
  PAYONEER_CLIENT_SECRET: string;
}

const config: Config = {
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
};

export default config;
