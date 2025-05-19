"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Order } from "@/types/order";
import { dateUtils } from "@/utils/dateUtils";
import { uuidUtils } from "@/utils/uuid";
import CartTable from "../../cart/cartTable";
import { currencyUtils } from "@/utils/currencyUtils";

const OrderDetailsTable = ({ order }: { order: Order }) => {
  const {
    shippingAddress,
    orderItems,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paymentMethod,
    isDelivered,
    deliveredAt,
    isPaid,
    paidAt,
  } = order;

  return (
    <>
      <h1 className="py-4 text-2xl">
        Order {uuidUtils.shortenFormat(order.id)}
      </h1>
      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="col-span-2 space-y-2 overflow-x-auto">
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Payment Method</h2>
              <p className="mb-2">{paymentMethod}</p>
              {isPaid ? (
                <Badge variant="secondary">
                  Paid at: {dateUtils.format(paidAt!).dateTime}
                </Badge>
              ) : (
                <Badge variant="destructive">Not Paid</Badge>
              )}
            </CardContent>
          </Card>

          <Card className="my-2">
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Shipping Address</h2>
              <p>{shippingAddress.fullName}</p>
              <p className="mb-2">
                {shippingAddress.streetAddress}, {shippingAddress.city}{" "}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>

              {isDelivered ? (
                <Badge variant="secondary">
                  Delivered at: {dateUtils.format(deliveredAt!).dateTime}
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
                  itemsPrice: order.itemsPrice,
                  shippingPrice: order.shippingPrice,
                  taxPrice: order.taxPrice,
                  totalPrice: order.totalPrice,
                  sessionCartId: order.id,
                  userId: order.userId,
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
                <div>{currencyUtils.format(order.itemsPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Tax</div>
                <div>{currencyUtils.format(order.taxPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Shipping</div>
                <div>{currencyUtils.format(order.shippingPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Total</div>
                <div>{currencyUtils.format(order.totalPrice)}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsTable;
