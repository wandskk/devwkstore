import { z } from "zod";
import { PAYMENT_CONSTANTS } from "@/lib/constants/payment";
import { shippingSchema } from "@/lib/validators/shipping";
import { currency } from "@/lib/validators/currency";

export const insertOrderItemSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  image: z.string(),
  name: z.string(),
  price: currency,
  qty: z.number(),
});

export const insertOrderSchema = z.object({
  userId: z.string().min(1, "User is required"),
  itemsPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  totalPrice: currency,
  paymentMethod: z
    .string()
    .refine((data) => PAYMENT_CONSTANTS.methods.includes(data), {
      message: "Invalid payment method",
    }),
  shippingAddress: shippingSchema,
});
