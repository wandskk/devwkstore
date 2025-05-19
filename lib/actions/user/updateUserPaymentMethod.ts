"use server";

import { prisma } from "@/db/prisma";
import { paymentMethodSchema } from "@/lib/validators/payment";
import { getUserWithSession } from "@/lib/utils/user.utils";
import { formatError } from "@/lib/utils/error.utils";
import { z } from "zod";

export async function updateUserPaymentMethod(
  data: z.infer<typeof paymentMethodSchema>
) {
  try {
    const currentUser = await getUserWithSession();
    const paymentMethod = paymentMethodSchema.parse(data);

    await prisma.user.update({
      where: { id: currentUser?.id },
      data: { paymentMethod: paymentMethod.type },
    });

    return {
      success: true,
      message: "User updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
