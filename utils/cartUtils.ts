import { auth } from "@/auth";
import { CartItem } from "@/types/cart";
import { cookies } from "next/headers";

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
    return (cartItems as CartItem[]).find(
      (x) => x.productId === item.productId
    );
  },
};
