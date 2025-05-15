import { Cart, CartItem } from "@/types/cart";
import { cookies } from "next/headers";
import { auth } from "@/auth";

export const cartUtils = {
  getCartAndUserCookies: async () => {
    const sessionCartId = (await cookies()).get("sessionCartId")?.value;
    if (!sessionCartId) throw new Error("Cart session not found");

    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    return {
      sessionCartId,
      userId,
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
