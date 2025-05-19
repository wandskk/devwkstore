"use server";

import { getUserWithSession } from "@/lib/utils/user.utils";
import { isRedirectError } from "next/dist/client/components/redirect";
import { getMyCart } from "@/lib/actions/cart";
import { formatError } from "@/lib/utils/error.utils";
import { createOrderTransaction } from "./db";

export const createOrder = async () => {
  try {
    const user = await getUserWithSession();
    const cart = await getMyCart();

    const errors = [
      { validator: !user, message: "User not found", redirectTo: "/login" },
      {
        validator: !cart || cart.items.length === 0,
        message: "Your cart is empty",
        redirectTo: "/cart",
      },
      {
        validator: !user?.address,
        message: "No shipping address",
        redirectTo: "/shipping-address",
      },
      {
        validator: !user?.paymentMethod,
        message: "No payment method",
        redirectTo: "/payment-method",
      },
    ];

    for (const error of errors) {
      if (error.validator) {
        return {
          success: false,
          message: error.message,
          redirectTo: error.redirectTo,
        };
      }
    }

    const userData = user!;
    const cartData = cart!;

    const orderData = {
      userId: userData.id,
      shippingAddress: userData.address as Record<string, unknown>,
      paymentMethod: userData.paymentMethod!,
      paymentResult: {},
      itemsPrice: Number(cartData.itemsPrice),
      shippingPrice: Number(cartData.shippingPrice),
      taxPrice: Number(cartData.taxPrice),
      totalPrice: Number(cartData.totalPrice),
    };

    const insertedOrderId = await createOrderTransaction(
      orderData,
      cartData.items,
      cartData.id
    );

    return {
      success: true,
      message: "Order created",
      redirectTo: `/order/${insertedOrderId}`,
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return {
      success: false,
      message: formatError(error),
    };
  }
};
