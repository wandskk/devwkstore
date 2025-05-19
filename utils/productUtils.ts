import { CartItem } from "@/lib/types/cart";
import { Product } from "@/lib/types/product";

export const productUtils = {
  validateStock: (product: Product, compareWith?: CartItem) => {
    if (product.stock < 1) throw new Error("Product is out of stock.");

    if (compareWith && product.stock < compareWith.qty + 1)
      throw new Error("Insufficient stock compared to the reference product.");
  },
  existProduct: (cartItems: CartItem[], productId: string) => {
    const exist = (cartItems as CartItem[]).find(
      (x) => x.productId === productId
    );
    if (!exist) throw new Error("Item not found");
    else return exist;
  },
};
