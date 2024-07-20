export interface Payout {
  create(recipient: string, amount: number, currency: string): Promise<unknown>;
}

export interface PaymentStrategy {
  payout: Payout;
}
