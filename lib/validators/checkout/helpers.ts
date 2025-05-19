import { checkoutNavigationItemSchema } from "./schemas";

export const validateNavigationItems = (items: unknown[]) => {
  return items.every((item) => {
    const parsed = checkoutNavigationItemSchema.safeParse(item);
    return parsed.success;
  });
};
