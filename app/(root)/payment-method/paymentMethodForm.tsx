"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { useTransition } from "react";
import { paymentMethodSchema } from "@/lib/validators/paymentMethod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DEFAULT_PAYMENT_METHOD } from "@/lib/constants";

const PaymentMethodForm = ({
  preferredPaymentMethod,
}: {
  preferredPaymentMethod: string | null;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof paymentMethodSchema>>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: preferredPaymentMethod || DEFAULT_PAYMENT_METHOD,
    },
  });

  return <>PaymentMethodForm</>;
};

export default PaymentMethodForm;
