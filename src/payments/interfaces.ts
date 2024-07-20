export interface PaymentStrategy<P, A> {
  payout: P;
  account: A;
}
