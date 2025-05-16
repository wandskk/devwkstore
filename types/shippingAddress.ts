import { shippingAddressSchema } from "@/lib/validators/shippingAddress";
import { z } from "zod";

export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
