import { PaymentStrategy } from './interfaces';

export class PaymentContext<P, A = undefined> {
  constructor(private strategy: PaymentStrategy<P, A>) {}

  get payment() {
    return this.strategy.payments;
  }

  get account(): A extends undefined ? undefined : A {
    return this.strategy['account'];
  }
}
