import { PaymentStrategy, Payout, Account, STRATEGY } from './interfaces';

export class PaymentContext<P, A, S extends STRATEGY> {
  constructor(private strategy: PaymentStrategy<P, A, S>) {}

  get payout(): Payout<P, S> {
    return this.strategy.payout;
  }

  get account() {
    return this.strategy.account;
  }
}
