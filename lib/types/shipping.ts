import { z } from "zod";
import { shippingAddressSchema } from "../validators/shippingAddress";

export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
