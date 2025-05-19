import { paymentMethodSchema } from "./schemas";

export const validatePaymentMethod = (data: unknown) => {
  return paymentMethodSchema.safeParse(data);
};
