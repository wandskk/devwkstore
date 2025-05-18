"use server";

import { signInFormSchema, signUpFormSchema } from "@/lib/validators/form";
import { auth, signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";
import { errorUtils } from "@/utils/errorUtils";
import { ShippingAddress } from "@/types/shippingAddress";
import { shippingAddressSchema } from "../validators/shippingAddress";
import { paymentMethodSchema } from "../validators/paymentMethod";
import { z } from "zod";

export async function signInWithCredentials(
  prevState: unknown,
  formaData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formaData.get("email"),
      password: formaData.get("password"),
    });

    await signIn("credentials", user);

    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: "Invalid email or password",
    };
  }
}

export async function signOutUser() {
  await signOut();
}

export async function signUpUser(prevState: unknown, formaData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formaData.get("name"),
      email: formaData.get("email"),
      password: formaData.get("password"),
      confirmPassword: formaData.get("confirmPassword"),
    });

    user.password = hashSync(user.password, 10);

    const plainPassword = user.password;

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    await signIn("credentials", {
      email: user.email,
      password: plainPassword,
    });

    return {
      success: true,
      message: "User registered successfully",
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: errorUtils.format(error),
    };
  }
}

export async function getUserById(userId: string) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) throw new Error("User not found");

  return user;
}

export async function getUserBySession() {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) throw new Error("No user Id");

  return getUserById(userId);
}

export async function updateUserAddress(data: ShippingAddress) {
  try {
    const currentUser = await getUserBySession();

    const address = await shippingAddressSchema.parse(data);

    await prisma.user.update({
      where: { id: currentUser.id },
      data: { address },
    });

    return {
      success: true,
      message: "User updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: errorUtils.format(error),
    };
  }
}

export async function updateUserPaymentMethod(
  data: z.infer<typeof paymentMethodSchema>
) {
  try {
    const currentUser = await getUserBySession();

    const paymentMethod = await paymentMethodSchema.parse(data);

    await prisma.user.update({
      where: { id: currentUser.id },
      data: { paymentMethod: paymentMethod.type },
    });

    return {
      success: true,
      message: "User updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: errorUtils.format(error),
    };
  }
}
