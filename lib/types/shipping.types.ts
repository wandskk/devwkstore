import { z } from "zod";
import { shippingSchema } from "@/lib/validators/shipping";

export type ShippingAddress = z.infer<typeof shippingSchema>;
