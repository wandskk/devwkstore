"use server";

import { getCartAndUserCookies } from "@/lib/helpers/cart.helpers";
import { prisma } from "@/db/prisma";
import { convertToPlainObject } from "@/lib/utils/convert.utils";
import type { Cart, CartItem } from "@/lib/types/cart.types";

export async function getMyCart(): Promise<(Cart & { id: string }) | undefined> {
  const { sessionCartId, userId } = await getCartAndUserCookies();
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId } : { sessionCartId },
  });

  if (!cart) return undefined;

  return convertToPlainObject({
    id: cart.id,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
    sessionCartId: cart.sessionCartId,
    userId: cart.userId,
  });
}
