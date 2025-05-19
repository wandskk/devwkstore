import { Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/actions/order.actions";

export const metadata: Metadata = {
  title: "Order Details",
};

const OrderDetailsPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  const order = await getOrderById(id);
  if (!order) return notFound();

  return <div>Details {order.totalPrice.toString()}</div>;
};

export default OrderDetailsPage;
