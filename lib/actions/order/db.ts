"use server";

import { prisma } from "@/db/prisma";
import type { CartItem } from "@/lib/types/cart.types";

export async function createOrderTransaction(
  orderData: {
    userId: string;
    shippingAddress: Record<string, unknown>;
    paymentMethod: string;
    paymentResult: object;
    itemsPrice: number;
    shippingPrice: number;
    taxPrice: number;
    totalPrice: number;
  },
  items: CartItem[],
  cartId: string
): Promise<string> {
  return await prisma.$transaction(async (tx): Promise<string> => {
    const order = await tx.order.create({ data: orderData });

    for (const item of items) {
      await tx.orderItem.create({
        data: {
          productId: item.productId,
          name: item.name,
          slug: item.slug,
          image: item.image,
          price: item.price,
          qty: item.qty,
          orderId: order.id,
        },
      });
    }

    await tx.cart.update({
      where: { id: cartId },
      data: {
        items: [],
        totalPrice: 0,
        taxPrice: 0,
        shippingPrice: 0,
        itemsPrice: 0,
      },
    });

    return order.id;
  });
}
