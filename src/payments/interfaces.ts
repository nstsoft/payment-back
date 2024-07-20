export interface Payout<P> {
  create(recipient: string, amount: number, currency: string): Promise<P>;
}

export interface Account<A> {
  create(): Promise<A>;
}

export interface PaymentStrategy<P, A> {
  payout: Payout<P>;
  account: Account<A>;
}
