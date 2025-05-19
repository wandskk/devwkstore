import { z } from "zod";
import { paymentMethodSchema } from "@/lib/validators/payment";

export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
