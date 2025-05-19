import { z } from "zod";
import { paymentMethodSchema } from "../validators/payment";

export type PaymentMethod = z.infer<typeof paymentMethodSchema>;
