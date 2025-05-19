"use server";

import { prisma } from "@/db/prisma";
import { shippingSchema } from "@/lib/validators/shipping";
import { getUserWithSession } from "@/lib/utils/user.utils";
import { formatError } from "@/lib/utils/error.utils";
import { ShippingAddress } from "@/lib/types/shipping.types";

export async function updateUserAddress(data: ShippingAddress) {
  try {
    const currentUser = await getUserWithSession();
    const address = shippingSchema.parse(data);

    await prisma.user.update({
      where: { id: currentUser?.id },
      data: { address },
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
