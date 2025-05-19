import type { z } from "zod";
import { shippingSchema } from "./schemas";

export type ShippingData = z.infer<typeof shippingSchema>;

// Exemplo de helper: valida se tem lat e lng
export const hasCoordinates = (shipping: ShippingData): boolean => {
  return typeof shipping.lat === "number" && typeof shipping.lng === "number";
};

// Você pode adicionar outros helpers para formatar endereço, etc.
