import Stripe from 'stripe';

export enum PaymentGatewayE {
  STRIPE = 'STRIPE',
  PAYPAL = 'PAYPAL',
  PAYONEER = 'PAYONEER',
}

export type User = {
  email: string;
  paymentGateway: PaymentGatewayE;
  currency: string;
};

export type StripeConnectedAccount = {
  id: string;
  object: string;
  country: string;
  created: number;
  default_currency: string;
  type: Stripe.AccountCreateParams.Type;
  email: string;
};
