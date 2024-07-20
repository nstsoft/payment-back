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
