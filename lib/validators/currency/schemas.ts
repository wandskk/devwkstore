import { z } from "zod";
import { formatNumberWithDecimal } from "@/lib/utils/number.utils";

const currencyRegex = /^\d+(\.\d{2})?$/;

export const currency = z
  .string()
  .refine(
    (value) => currencyRegex.test(formatNumberWithDecimal(Number(value))),
    "Price must have exactly two decimal places"
  );
