class PaymentContext {
  strategy;
  constructor(strategy) {
    this.strategy = strategy;
  }

  get payment() {
    return this.strategy.payments;
  }

  get account() {
    return this.strategy.account;
  }
}

module.exports = PaymentContext;
