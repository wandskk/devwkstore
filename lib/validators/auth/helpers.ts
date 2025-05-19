import { signInFormSchema, signUpFormSchema } from "./schemas";

export const validateSignInForm = (data: unknown) => {
  return signInFormSchema.safeParse(data);
};

export const validateSignUpForm = (data: unknown) => {
  return signUpFormSchema.safeParse(data);
};
