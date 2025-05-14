"use server";

import { Cart, CartItem } from "@/types/cart";
import { errorUtils } from "@/utils/errorUtils";
import { cartUtils } from "@/utils/cartUtils";
import { prisma } from "@/db/prisma";
import { cartItemSchema, insertCartSchema } from "../validators/cart";
import { getProductById } from "./product.actions";
import { priceUtils } from "@/utils/priceUtils";
import { convertToPlainObject } from "../utils";
import { revalidatePath } from "next/cache";

export async function addItemToCart(data: CartItem) {
  try {
    const { calculatePrices } = priceUtils;
    const { sessionCartId, userId } = await cartUtils.getCartAndUserCookies();

    const cart = await getMyCart();

    const item = cartItemSchema.parse(data);

    const product = await getProductById(item.productId);

    if (!product) throw new Error("Product not found");

    if (!cart) {
      const newCart = insertCartSchema.parse({
        userId: userId,
        items: [item],
        sessionCartId: sessionCartId,
        ...calculatePrices([item]),
      });

      await addCartToDatabase(newCart);

      revalidatePath(`/product/${product.slug}`);

      return {
        success: true,
        message: "Item added to cart",
      };
    } else {
    }
  } catch (error) {
    return {
      success: false,
      message: errorUtils.format(error),
    };
  }
}

export async function getMyCart() {
  try {
    const { sessionCartId, userId } = await cartUtils.getCartAndUserCookies();

    const cart = await prisma.cart.findFirst({
      where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
    });

    if (!cart) return undefined;

    return convertToPlainObject({
      ...cart,
      items: cart.items as CartItem[],
      itemsPrice: cart.itemsPrice.toString(),
      totalPrice: cart.totalPrice.toString(),
      shippingPrice: cart.shippingPrice.toString(),
      taxPrice: cart.taxPrice.toString(),
    });
  } catch (error) {
    return {
      success: false,
      message: errorUtils.format(error),
    };
  }
}

export async function addCartToDatabase(cart: Cart) {
  await prisma.cart.create({
    data: cart,
  });
}
