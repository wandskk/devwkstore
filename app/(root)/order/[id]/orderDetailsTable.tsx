"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Order } from "@/lib/types/order.types";
import { formatDate } from "@/lib/utils/date.utils";
import { shortenFormat } from "@/lib/utils/uuid.utils";
import CartTable from "@/app/(root)/cart/cartTable";
import { formatCurrency } from "@/lib/utils/currency.utils";
import { ShippingAddress } from "@/lib/types/shipping.types";

const OrderDetailsTable = ({ order }: { order: Order }) => {
  const {
    shippingAddress,
    // orderItems,
    // itemsPrice,
    // shippingPrice,
    // taxPrice,
    // totalPrice,
    paymentMethod,
    isDelivered,
    deliveredAt,
    isPaid,
    paidAt,
  } = order;

  const address = shippingAddress as ShippingAddress;

  return (
    <>
      <h1 className="py-4 text-2xl">Order {shortenFormat(order.id)}</h1>
      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="col-span-2 space-y-2 overflow-x-auto">
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Payment Method</h2>
              <p className="mb-2">{paymentMethod as string}</p>
              {isPaid ? (
                <Badge variant="secondary">
                  Paid at: {formatDate(paidAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant="destructive">Not Paid</Badge>
              )}
            </CardContent>
          </Card>

          <Card className="my-2">
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Shipping Address</h2>
              <p>{address.fullName}</p>
              <p className="mb-2">
                {address.streetAddress}, {address.city} {address.postalCode},{" "}
                {address.country}
              </p>

              {isDelivered ? (
                <Badge variant="secondary">
                  Delivered at: {formatDate(deliveredAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant="destructive">Not Delivered</Badge>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Order Items</h2>
              <CartTable
                cart={{
                  items: order.orderItems,
                  itemsPrice: order.itemsPrice as string,
                  shippingPrice: order.shippingPrice as string,
                  taxPrice: order.taxPrice as string,
                  totalPrice: order.totalPrice as string,
                  sessionCartId: order.id,
                  userId: order.userId as string | null,
                }}
                anotherPage={true}
              />
            </CardContent>
          </Card>
        </div>
        <div className="">
          <Card>
            <CardContent className="p-4 gap-4 space-y-4">
              <div className="flex justify-between">
                <div>Items</div>
                <div>{formatCurrency(order.itemsPrice as string)}</div>
              </div>
              <div className="flex justify-between">
                <div>Tax</div>
                <div>{formatCurrency(order.taxPrice as string)}</div>
              </div>
              <div className="flex justify-between">
                <div>Shipping</div>
                <div>{formatCurrency(order.shippingPrice as string)}</div>
              </div>
              <div className="flex justify-between">
                <div>Total</div>
                <div>{formatCurrency(order.totalPrice as string)}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsTable;
