import { PaymentStrategy } from './interfaces';

export class PaymentContext<P, A> {
  constructor(private strategy: PaymentStrategy<P, A>) {}

  get payout() {
    return this.strategy.payout;
  }

  get account() {
    return this.strategy.account;
  }
}
