import { z } from "zod";
import { signInFormSchema, signUpFormSchema } from "@/lib/validators/auth";
import { shippingSchema } from "@/lib/validators/shipping";

export type FormSignIn = z.infer<typeof signInFormSchema>;

export type FormSignUp = z.infer<typeof signUpFormSchema>;

export type FormShippingAddress = z.infer<typeof shippingSchema>;

export type FormShippingAddressField = {
  name: string;
  label: string;
  placeholder: string;
};
