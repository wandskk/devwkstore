import { CartItem } from "@/lib/types/cart.types";

export function isCartEmpty(items: CartItem[]) {
  return items.length === 0;
}

export function totalQuantity(items: CartItem[]) {
  return items.reduce((acc, item) => acc + item.qty, 0);
}
