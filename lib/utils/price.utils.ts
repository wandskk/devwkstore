import { CartItem } from "@/lib/types/cart.types";
import { formatNumberWithDecimal, roundTwoDecimals } from "./number.utils";

export const reducePrices = (items: CartItem[]) => {
  return items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0);
};

export const calculatePrices = (items: CartItem[]) => {
  const reducedPrices = reducePrices(items);
  const itemsPrice = roundTwoDecimals(reducedPrices);
  const shippingPrice = roundTwoDecimals(itemsPrice > 100 ? 0 : 10);
  const taxPrice = roundTwoDecimals(0.15 * itemsPrice);
  const totalPrice = roundTwoDecimals(itemsPrice + shippingPrice + taxPrice);

  return {
    itemsPrice: formatNumberWithDecimal(itemsPrice),
    shippingPrice: formatNumberWithDecimal(shippingPrice),
    taxPrice: formatNumberWithDecimal(taxPrice),
    totalPrice: formatNumberWithDecimal(totalPrice),
  };
};
