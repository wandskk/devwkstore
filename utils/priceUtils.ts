import { CartItem } from "@/lib/types/cart";
import { numberUtils } from "./numberUtils";

export const priceUtils = {
  calculatePrices: (items: CartItem[]) => {
    const { roundTwoDecimals, formatNumberWithDecimal } = numberUtils;
    const { reducePrices } = priceUtils;

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
  },
  reducePrices: (items: CartItem[]) => {
    return items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0);
  },
};
