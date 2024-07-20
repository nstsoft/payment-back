import 'dotenv/config';

interface Config {
  port: number;
  STRIPE_API_KEY: string;
  PAYAPAL_MODE: string;
  PAYPAL_CLIENT_ID: string;
  PAYPAL_CLIENT_SECRET: string;
  PAYPAL_SENDER: string;
}

const config: Config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  STRIPE_API_KEY: process.env.STRIPE_API_KEY || '',
  PAYAPAL_MODE: process.env.PAYAPAL_MODE || '',
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || '',
  PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET || '',
  PAYPAL_SENDER: process.env.PAYPAL_SENDER || '',
};

export default config;
