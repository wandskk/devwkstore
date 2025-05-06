import { numberUtils } from "@/utils/numberUtils";
import { z } from "zod";

const currencyRegex = /^\d+(\.\d{2})?$/;

export const currency = z
    .string()
    .refine((value) => currencyRegex.test(numberUtils.formatNumberWithDecimal(Number(value))),
        'Price must have exactly two decimal places')