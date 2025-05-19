import { z } from "zod";
import { PAYMENT_CONSTANTS } from "@/lib/constants/payment";

export const paymentMethodSchema = z
  .object({
    type: z.string().min(1, "Payment method is required"),
  })
  .refine((data) => PAYMENT_CONSTANTS.methods.includes(data.type), {
    path: ["type"],
    message: "Invalid payment method",
  });
