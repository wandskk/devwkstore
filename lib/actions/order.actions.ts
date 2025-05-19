"use server";

import { prisma } from "@/db/prisma";
import { errorUtils } from "@/utils/errorUtils";
import { userUtils } from "@/utils/userUtils";
import { isRedirectError } from "next/dist/client/components/redirect";
import { getMyCart } from "./cart.actions";
import { CartItem } from "@/types/cart";
import { convertUtils } from "@/utils/convertUtils";

export const createOrder = async () => {
  try {
    const user = await userUtils.getUserWithSession();
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

    const order = {
      userId: user!.id,
      shippingAddress: user!.address as Record<string, unknown>,
      paymentMethod: user!.paymentMethod!,
      paymentResult: {},
      itemsPrice: cart!.itemsPrice,
      shippingPrice: cart!.shippingPrice,
      taxPrice: cart!.taxPrice,
      totalPrice: cart!.totalPrice,
    };

    const insertedOrderId = await prisma.$transaction(
      async (tx): Promise<string> => {
        const insertedOrder = await tx.order.create({
          data: order,
        });

        for (const item of cart?.items as CartItem[]) {
          await tx.orderItem.create({
            data: {
              productId: item.productId,
              name: item.name,
              slug: item.slug,
              image: item.image,
              price: item.price,
              qty: item.qty,
              orderId: insertedOrder.id,
            },
          });
        }

        await tx.cart.update({
          where: {
            id: cart?.id,
          },
          data: {
            items: [],
            totalPrice: 0,
            taxPrice: 0,
            shippingPrice: 0,
            itemsPrice: 0,
          },
        });
        return insertedOrder.id;
      }
    );

    if (!insertedOrderId) throw new Error("Order not created");

    return {
      success: true,
      message: "Order created",
      redirectTo: `/order/${insertedOrderId}`,
    };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return {
      success: false,
      message: errorUtils.format(error),
    };
  }
};

export async function getOrderById(orderId: string) {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      orderitems: true,
      user: { select: { name: true, email: true } },
    },
  });

  return convertUtils.convertToPlainObject(order);
}
