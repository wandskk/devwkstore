import { CartItem } from "@/lib/types/cart.types";
import { Product } from "@/lib/types/product.types";

export const validateStock = (product: Product, compareWith?: CartItem) => {
  if (product.stock < 1) {
    throw new Error("Product is out of stock.");
  }

  if (compareWith && product.stock < compareWith.qty + 1) {
    throw new Error("Insufficient stock compared to the reference product.");
  }
};

export const existProduct = (
  cartItems: CartItem[],
  productId: string
): CartItem => {
  const exist = cartItems.find((x) => x.productId === productId);
  if (!exist) throw new Error("Item not found");
  return exist;
};
