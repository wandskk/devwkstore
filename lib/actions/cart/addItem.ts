"use server";

import { cartItemSchema, insertCartSchema } from "@/lib/validators/cart";
import { calculatePrices } from "@/lib/utils/price.utils";
import { getProductById } from "@/lib/actions/product";
import { getCartAndUserCookies } from "@/lib/helpers/cart.helpers";
import { formatError } from "@/lib/utils/error.utils";
import { validateStock } from "@/lib/utils/product.utils";
import { existSameCartItem } from "@/lib/utils/cart.utils";
import { revalidatePath } from "next/cache";
import { addCartToDatabase, updateCartInDatabase } from "./db";
import type { CartItem } from "@/lib/types/cart.types";
import { getMyCart } from "./getCart";

export async function addItemToCart(data: CartItem) {
  try {
    const { sessionCartId, userId } = await getCartAndUserCookies();
    const cart = await getMyCart();
    const item = cartItemSchema.parse(data);
    const product = await getProductById(item.productId);
    if (!product) throw new Error("Product not found");

    if (!cart) {
      const newCart = insertCartSchema.parse({
        userId,
        items: [item],
        sessionCartId,
        ...calculatePrices([item]),
      });

      await addCartToDatabase(newCart);
      revalidatePath(`/product/${product.slug}`);

      return { success: true, message: "Item added to cart" };
    }

    const existItem = existSameCartItem(cart.items, item);
    if (existItem) {
      validateStock(product, existItem);
      existItem.qty += 1;
    } else {
      validateStock(product);
      cart.items.push(item);
    }

    await updateCartInDatabase(cart);
    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: `${product.name} ${existItem ? "Updated in" : "added to"} cart`,
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
