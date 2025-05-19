import type { z } from "zod";
import { insertProductSchema } from "./schemas";

export type ProductInput = z.infer<typeof insertProductSchema>;

export const isStockAvailable = (stock: number): boolean => stock > 0;

export const formatProductName = (name: string): string =>
  name.trim().toLowerCase();
