import React from "react";
import { Metadata } from "next";
import PaymentMethodForm from "./paymentMethodForm";
import { userUtils } from "@/utils/userUtils";

export const metadata: Metadata = {
  title: "Select Payment Method",
};

const PaymentMethodPage = async () => {
  const user = await userUtils.getUserWithSession();

  return (
    <>
      <PaymentMethodForm preferredPaymentMethod={user?.paymentMethod || null} />
    </>
  );
};

export default PaymentMethodPage;
