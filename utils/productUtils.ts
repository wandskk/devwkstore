import { CartItem } from "@/types/cart";
import { Product } from "@/types/product";

export const productUtils = {
  validateStock: (product: Product, compareWith?: CartItem) => {
    if (product.stock < 1) throw new Error("Product is out of stock.");

    if (compareWith && product.stock < compareWith.qty + 1)
      throw new Error("Insufficient stock compared to the reference product.");
  },
};
