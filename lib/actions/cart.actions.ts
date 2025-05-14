"use server";

import { CartItem } from "@/types/cart";
import { errorUtils } from "@/utils/errorUtils";
import { cartUtils } from "@/utils/cartUtils";
import { prisma } from "@/db/prisma";
import { convertUtils } from "@/utils/convertUtils";
import { cartItemSchema } from "../validators/cart";
import { getProductById } from "./product.actions";

export async function addItemToCart(data: CartItem) {
  try {
    const { sessionCartId, userId } = await cartUtils.getCartAndUserCookies();

    const cart = await getMyCart();

    const item = cartItemSchema.parse(data);

    const product = await getProductById(item.productId);

    console.log({
      "Session Cart ID": sessionCartId,
      "User ID": userId,
      "Item Requested": item,
      "Product Found": product,
    });

    return {
      success: true,
      message: "Item added to cart",
    };
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

    return convertUtils.convertToPlainObject({
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
