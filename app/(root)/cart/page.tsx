import React from "react";
import CartTable from "./cartTable";
import { getMyCart } from "@/lib/actions/cart.actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart",
};

const CartPage = async () => {
  const cart = await getMyCart();
  return (
    <>
      <CartTable cart={cart} />
    </>
  );
};

export default CartPage;
