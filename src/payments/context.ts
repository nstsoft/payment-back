import { PaymentStrategy, Payout, Account } from './interfaces';

export class PaymentContext<P, A> {
  constructor(private strategy: PaymentStrategy<P, A>) {}

  get payout(): Payout<P> {
    const strategy = this.strategy;
    return {
      create: function (...args: [string, number, string]) {
        return strategy.payout.create(...args);
      },
    };
  }

  get account(): Account<A> {
    const strategy = this.strategy;
    return {
      create: function (...args) {
        return strategy.account.create(...args);
      },
    };
  }
}
