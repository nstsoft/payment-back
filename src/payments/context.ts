import { PaymentStrategy } from './interfaces';

export class PaymentContext<P, A> {
  constructor(private strategy: PaymentStrategy<P, A>) {}

  get payment() {
    return this.strategy.payments;
  }

  get account() {
    return this.strategy.account;
  }
}
