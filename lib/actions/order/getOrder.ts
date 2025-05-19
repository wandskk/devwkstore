"use server";

import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "@/lib/utils/convert.utils";

export async function getOrderById(orderId: string) {
  const order = await prisma.order.findFirst({
    where: { id: orderId },
    include: {
      orderItems: true,
      user: { select: { name: true, email: true } },
    },
  });

  return convertToPlainObject(order);
}
