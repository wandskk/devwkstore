export const dynamic = "force-dynamic";

import React from "react";
import { getMyCart } from "@/lib/actions/cart.actions";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ShippingAddress } from "@/lib/types/shipping";
import ShippingAddressForm from "./shippingAddressForm";
import { userUtils } from "@/utils/userUtils";

export const metadata: Metadata = {
  title: "Shipping Address",
};

const ShippingAddressPage = async () => {
  const cart = await getMyCart();
  const user = await userUtils.getUserWithSession();

  if (!cart || cart.items.length === 0) return redirect("/cart");

  return (
    <>
      <ShippingAddressForm address={user?.address as ShippingAddress} />
    </>
  );
};

export default ShippingAddressPage;
