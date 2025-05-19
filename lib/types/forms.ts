import { z } from "zod";
import { signInFormSchema, signUpFormSchema } from "@/lib/validators/form";
import { shippingAddressSchema } from "../validators/shippingAddress";

export type FormSignIn = z.infer<typeof signInFormSchema>;

export type FormSignUp = z.infer<typeof signUpFormSchema>;

export type FormShippingAddress = z.infer<typeof shippingAddressSchema>;

export type FormShippingAddressField = {
  name: string;
  label: string;
  placeholder: string;
};
