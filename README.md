`PAYONEER_SCOPES`

`PAYONEER_PROGRAM_ID`

`PAYONEER_REDIRECT_URL`

## Appendix

PaymentContext - basic class which is used for payment orchestrating.

Supports strategies as constructor arguments:

- StripePayment
- PayPalPayment
- PayonnerPayment

Usage example :

```bash
  const stripe = new StripePayment();
  const paymentContext = new PaymentContext(stripe);
  const payment = await paymentContext.payment.createTransfer(userId, {amount});
```

Available methods

- `paymentContext.payment`

  - `createTransfer (Stripe, Payoneer, PayPal)`: create money transfer to c cpecific account
  - `createPayout (Stripe)`: Creates a payout for the specified stripe account with the given amount and currency.
  - `withdraw (Stripe )`: crates transfer then payout

- `paymentContext.account`
  - onboard (Stripe, Payoneer): returns redirectio link for customer account onboarding

```javascript
const paymentContext = new PaymentContext(payoneer);
const payment = await paymentContext.payment.createTransfer(accountId, {
  amount,
  currency: 'USD',
});
```
