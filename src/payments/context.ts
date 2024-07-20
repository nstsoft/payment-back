import { PaymentStrategy, Payout } from './interfaces';

export class PaymentContext {
  constructor(private strategy: PaymentStrategy) {}

  setStrategy(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  get payout(): Payout {
    const strategy = this.strategy;
    return {
      create: function (...args) {
        return strategy.payout.create(...args);
      },
    };
  }
}
