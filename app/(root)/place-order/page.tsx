export const dynamic = "force-dynamic";

import React from "react";
import { Metadata } from "next";
import { getMyCart } from "@/lib/actions/cart.actions";
import { redirect } from "next/navigation";
import { ShippingAddress } from "@/types/shippingAddress";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CartTable from "../cart/cartTable";
import { currencyUtils } from "@/utils/currencyUtils";
import { convertUtils } from "@/utils/convertUtils";
import { userUtils } from "@/utils/userUtils";

export const metadata: Metadata = {
  title: "Place Order",
};

const PlaceOrderPage = async () => {
  const cart = await getMyCart();
  const user = await userUtils.getUserWithSession();

  const userAddress = user?.address as ShippingAddress;

  if (!cart || cart.items.length === 0) return redirect("/cart");

  if (user?.address === null) return redirect("/shipping-address");

  if (user?.paymentMethod === null) return redirect("/payment-method");

  return (
    <>
      <h1 className="py-4 text-2xl">Place Order</h1>
      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="md:col-span-2 over-x-auto space-y-4">
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Shipping Address</h2>
              <p>{userAddress.fullName}</p>
              <p>
                <RenderUserAddress address={userAddress} />
              </p>
              <div className="mt-3">
                <Link href="/shipping-address">
                  <Button variant="outline">Edit</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Payment Method</h2>
              <p>{user?.paymentMethod}</p>

              <div className="mt-3">
                <Link href="/payment-method">
                  <Button variant="outline">Edit</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Order Items</h2>
              <CartTable cart={cart} anotherPage={true} />
            </CardContent>
          </Card>
        </div>
        <div className="">
          <Card>
            <CardContent className="p-4 gap-4 space-y-4">
              <div className="flex justify-between">
                <div>Items</div>
                <div>{currencyUtils.format(cart.itemsPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Tax</div>
                <div>{currencyUtils.format(cart.taxPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Shipping</div>
                <div>{currencyUtils.format(cart.shippingPrice)}</div>
              </div>
              <div className="flex justify-between">
                <div>Total</div>
                <div>{currencyUtils.format(cart.totalPrice)}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

const RenderUserAddress = ({ address }: { address: ShippingAddress }) => {
  const addressArray = convertUtils.convertObjectToArrayOfObjects(address);

  return addressArray.map(
    (item) => item.name !== "fullName" && `${item.value}, `
  );
};

export default PlaceOrderPage;
