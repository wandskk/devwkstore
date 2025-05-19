import { z } from "zod";
import { checkoutNavigationItemSchema } from "@/lib/validators/checkout";

export type CheckoutStepNavigation = z.infer<
  typeof checkoutNavigationItemSchema
>;
