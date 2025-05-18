import React from "react";
import { getUserBySession } from "@/lib/actions/user.actions";
import { Metadata } from "next";
import PaymentMethodForm from "./paymentMethodForm";

export const metadata: Metadata = {
  title: "Select Payment Method",
};

const PaymentMethodPage = async () => {
  const user = await getUserBySession();

  return (
    <>
      <PaymentMethodForm preferredPaymentMethod={user.paymentMethod} />
    </>
  );
};

export default PaymentMethodPage;
