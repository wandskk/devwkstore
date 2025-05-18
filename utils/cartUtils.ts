import { Cart, CartItem } from "@/types/cart";
import { cookies } from "next/headers";
import { userUtils } from "./userUtils";

export const cartUtils = {
  getCartAndUserCookies: async () => {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart session not found");

    const user = await userUtils.getUserWithSession();

    return {
      sessionCartId,
      userId: user?.id,
    };
  },
  existSameCartItem: (cartItems: CartItem[], item: CartItem) => {
    return cartItems.find((x) => x.productId === item.productId);
  },
  updateCartItemsAfterRemoval: (cart: Cart, productId: string): CartItem[] => {
    const existingItem = cart.items.find(
      (item) => item.productId === productId
    );

    if (!existingItem) {
      return cart.items;
    }

    if (existingItem.qty === 1) {
      return cart.items.filter((item) => item.productId !== productId);
    } else {
      return cart.items.map((item) =>
        item.productId === productId ? { ...item, qty: item.qty - 1 } : item
      );
    }
  },
};
