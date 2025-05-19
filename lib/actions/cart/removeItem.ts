"use server";

import { formatError } from "@/lib/utils/error.utils";
import { getProductById } from "@/lib/actions/product";
import { updateCartInDatabase } from "./db";
import { updateCartItemsAfterRemoval } from "@/lib/utils/cart.utils";
import { revalidatePath } from "next/cache";
import { getMyCart } from "./getCart";
import { existProduct } from "@/lib/utils/product.utils";

export async function removeItemFromCart(productId: string) {
  try {
    const product = await getProductById(productId);
    if (!product) throw new Error("Product not found");

    const cart = await getMyCart();
    if (!cart) throw new Error("Cart not found");

    existProduct(cart.items, productId);
    cart.items = updateCartItemsAfterRemoval(cart, productId);

    await updateCartInDatabase(cart);
    revalidatePath(`/product/${product.slug}`);

    return { success: true, message: `${product.name} was removed from cart` };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
