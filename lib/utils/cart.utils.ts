import { Cart, CartItem } from "@/lib/types/cart.types";

export const existSameCartItem = (cartItems: CartItem[], item: CartItem) => {
  return cartItems.find((x) => x.productId === item.productId);
};

export const updateCartItemsAfterRemoval = (
  cart: Cart,
  productId: string
): CartItem[] => {
  const existingItem = cart.items.find((item) => item.productId === productId);

  if (!existingItem) return cart.items;

  if (existingItem.qty === 1) {
    return cart.items.filter((item) => item.productId !== productId);
  }

  return cart.items.map((item) =>
    item.productId === productId ? { ...item, qty: item.qty - 1 } : item
  );
};
