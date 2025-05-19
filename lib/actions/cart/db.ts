"use server";

import { prisma } from "@/db/prisma";
import { calculatePrices } from "@/lib/utils/price.utils";
import type { Cart, CartItem } from "@/lib/types/cart.types";
import { Prisma } from "@prisma/client";

export async function addCartToDatabase(cart: Cart) {
  await prisma.cart.create({ data: cart });
}

export async function updateCartInDatabase(cart: Cart & { id: string }) {
  await prisma.cart.update({
    where: { id: cart.id },
    data: {
      items: cart.items as Prisma.CartUpdateitemsInput[],
      ...calculatePrices(cart.items as CartItem[]),
    },
  });
}
