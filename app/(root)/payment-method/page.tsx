import React from "react";
import { Metadata } from "next";
import PaymentMethodForm from "./paymentMethodForm";
import { getUserWithSession } from "@/lib/utils/user.utils";

export const metadata: Metadata = {
  title: "Select Payment Method",
};

const PaymentMethodPage = async () => {
  const user = await getUserWithSession();

  return (
    <>
      <PaymentMethodForm preferredPaymentMethod={user?.paymentMethod || null} />
    </>
  );
};

export default PaymentMethodPage;
