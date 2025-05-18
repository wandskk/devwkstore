"use server";

import { Cart, CartItem } from "@/types/cart";
import { errorUtils } from "@/utils/errorUtils";
import { cartUtils } from "@/utils/cartUtils";
import { prisma } from "@/db/prisma";
import { cartItemSchema, insertCartSchema } from "../validators/cart";
import { getProductById } from "./product.actions";
import { priceUtils } from "@/utils/priceUtils";
import { revalidatePath } from "next/cache";
import { productUtils } from "@/utils/productUtils";
import { Prisma } from "@prisma/client";
import { convertUtils } from "@/utils/convertUtils";

type CartWithId = Cart & { id: string };

export async function addItemToCart(data: CartItem) {
  try {
    const { existSameCartItem, getCartAndUserCookies } = cartUtils;
    const { calculatePrices } = priceUtils;
    const { sessionCartId, userId } = await getCartAndUserCookies();
    const { validateStock } = productUtils;

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
      const existItem = existSameCartItem(cart.items, item);

      if (existItem) {
        validateStock(product, existItem);
        existItem.qty = existItem.qty + 1;
      } else {
        validateStock(product);
        cart.items.push(item);
      }

      await updateCartInDatabase(cart);

      revalidatePath(`/product/${product.slug}`);

      return {
        success: true,
        message: `${product.name} ${
          existItem ? "Updated in" : "added to"
        } cart`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: errorUtils.format(error),
    };
  }
}

export async function getMyCart(): Promise<CartWithId | undefined> {
  try {
    const { sessionCartId, userId } = await cartUtils.getCartAndUserCookies();

    const cart = await prisma.cart.findFirst({
      where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
    });

    if (!cart) return undefined;

    return convertUtils.convertToPlainObject({
      id: cart.id,
      items: cart.items as CartItem[],
      itemsPrice: cart.itemsPrice.toString(),
      totalPrice: cart.totalPrice.toString(),
      shippingPrice: cart.shippingPrice.toString(),
      taxPrice: cart.taxPrice.toString(),
      sessionCartId: cart.sessionCartId,
      userId: cart.userId,
    });
  } catch (error) {
    console.error("getMyCart error:", error);
    return undefined;
  }
}

export async function addCartToDatabase(cart: Cart) {
  await prisma.cart.create({
    data: cart,
  });
}

export async function updateCartInDatabase(cart: CartWithId) {
  const { calculatePrices } = priceUtils;

  await prisma.cart.update({
    where: { id: cart.id },
    data: {
      items: cart.items as Prisma.CartUpdateitemsInput[],
      ...calculatePrices(cart.items as CartItem[]),
    },
  });
}

export async function removeItemFromCart(productId: string) {
  try {
    // const { sessionCartId } = await cartUtils.getCartAndUserCookies();
    const { existProduct } = productUtils;

    const product = await getProductById(productId);

    if (!product) throw new Error("Product not found");

    const cart = await getMyCart();
    if (!cart) throw new Error("Cart not found");

    existProduct(cart.items, productId);

    cart.items = cartUtils.updateCartItemsAfterRemoval(cart, productId);

    await updateCartInDatabase(cart);

    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: `${product.name} was removed from cart`,
    };
  } catch (error) {
    return {
      success: false,
      message: errorUtils.format(error),
    };
  }
}