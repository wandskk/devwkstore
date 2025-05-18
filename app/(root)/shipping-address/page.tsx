import React from "react";
import { getMyCart } from "@/lib/actions/cart.actions";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ShippingAddress } from "@/types/shippingAddress";
import { getUserBySession } from "@/lib/actions/user.actions";
import ShippingAddressForm from "./shippingAddressForm";

export const metadata: Metadata = {
  title: "Shipping Address",
};

const ShippingAddressPage = async () => {
  const cart = await getMyCart();

  if (!cart || cart.items.length === 0) redirect("/cart");

  const user = await getUserBySession();

  return (
    <>
      <ShippingAddressForm address={user.address as ShippingAddress} />
    </>
  );
};

export default ShippingAddressPage;
