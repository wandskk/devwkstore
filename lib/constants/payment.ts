export const PAYMENT_CONSTANTS = {
  methods: process.env.PAYMENT_METHODS?.split(", ") ?? [
    "PayPal",
    "Stripe",
    "CashOnDelivery",
  ],
  methodsDefault: process.env.PAYMENT_METHODS_DEFAULT ?? "PayPal",
};
