export type PaymentStrategy<P, A = undefined> = A extends undefined ? { payments: P } : { payments: P; account: A };
