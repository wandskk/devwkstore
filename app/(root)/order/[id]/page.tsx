import { Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/actions/order";
import OrderDetailsTable from "./orderDetailsTable";
import { ShippingAddress } from "@/lib/types/shipping.types";

export const metadata: Metadata = {
  title: "Order Details",
};

const OrderDetailsPage = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  const order = await getOrderById(id);
  if (!order) return notFound();

  return (
    <OrderDetailsTable
      order={{
        ...order,
        userId: order.userId ?? "",
        orderItems: order.orderItems,
        user: order.user ?? { name: "", email: "" },
        shippingAddress: order.shippingAddress as ShippingAddress,
      }}
    />
  );
};

export default OrderDetailsPage;
