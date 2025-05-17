import CheckoutSteps from "@/components/shared/checkoutSteps";
import React from "react";
import { getUserById } from "@/lib/actions/user.actions";
import { Metadata } from "next";
import { auth } from "@/auth";
import PaymentMethodForm from "./paymentMethodForm";

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
