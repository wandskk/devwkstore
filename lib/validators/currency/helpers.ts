import { currency } from "./schemas";

export const validateCurrency = (value: unknown) => {
  return currency.safeParse(value);
};
