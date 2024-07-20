export type STRATEGY = 'STRIPE' | 'PAYPAL' | 'PAYONEER';

export type CreateAccount<A, S extends STRATEGY> = S extends 'STRIPE'
  ? () => Promise<A>
  : S extends 'PAYPAL'
  ? (email: string) => Promise<A>
  : S extends 'PAYONEER'
  ? (id: number) => Promise<A>
  : never;

export type CreatePayout<P, S extends STRATEGY> = S extends 'STRIPE'
  ? (receiver: string, amount: number, currency?: string) => Promise<P>
  : S extends 'PAYPAL'
  ? (receiver: string, amount: number, currency?: string) => Promise<P>
  : S extends 'PAYONEER'
  ? (id: number) => Promise<P>
  : never;

export interface Payout<P, S extends STRATEGY> {
  create: CreatePayout<P, S>;
}

export interface Account<A, S extends STRATEGY> {
  create: CreateAccount<A, S>;
}

export interface PaymentStrategy<P, A, S extends STRATEGY> {
  payout: Payout<P, S>;
  account: Account<A, S>;
}
