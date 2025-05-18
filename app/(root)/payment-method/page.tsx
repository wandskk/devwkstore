import React from "react";
import { getUserById } from "@/lib/actions/user.actions";
import { Metadata } from "next";
import PaymentMethodForm from "./paymentMethodForm";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Select Payment Method",
};

const PaymentMethodPage = async () => {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) throw new Error("User not found");

  const user = await getUserById(userId);

  return (
    <>
      <PaymentMethodForm preferredPaymentMethod={user.paymentMethod} />
    </>
  );
};

export default PaymentMethodPage;
