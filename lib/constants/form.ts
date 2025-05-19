import { FormShippingAddress, FormSignIn, FormSignUp } from "@/lib/types/forms.types";

export const FORM_CONSTANTS = {
  signIn: {
    defaultValues: {
      email: process.env.NEXT_PUBLIC_ADMIN_EMAIL || "",
      password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "",
    } as FormSignIn,
  },
  signUp: {
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    } as FormSignUp,
  },
  shippingAddress: {
    defaultValues: {
      fullName: "",
      streetAddress: "",
      city: "",
      postalCode: "",
      country: "",
    } as FormShippingAddress,
  },
};
