"use client";

import React, { useTransition } from "react";
import { ShippingAddress } from "@/lib/types/shipping.types";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { shippingSchema } from "@/lib/validators/shipping";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form";
import { FORM_CONSTANTS } from "@/lib/constants/form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader } from "lucide-react";
import { SHIPPING_CONSTANTS } from "@/lib/constants/shipping";
import { updateUserAddress } from "@/lib/actions/user";
import { FormShippingAddressField } from "@/lib/types/forms.types";

type ShippingAddressFormFields = keyof z.infer<typeof shippingSchema>;

const ShippingAddressForm = ({ address }: { address: ShippingAddress }) => {
  const { shippingAddress } = FORM_CONSTANTS;
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof shippingSchema>>({
    resolver: zodResolver(shippingSchema),
    defaultValues: address || shippingAddress.defaultValues,
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<z.infer<typeof shippingSchema>> = async (
    values
  ) => {
    startTransition(async () => {
      const res = await updateUserAddress(values);

      if (!res.success) {
        toast({
          variant: "destructive",
          description: res.message,
        });
        return;
      }

      router.push("/payment-method");
    });
  };

  return (
    <>
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="h2-bold mt-4">Shipping Address</h1>
        <p className="text-sm text-muted-foreground">
          Please enter and address to ship to
        </p>
        <Form {...form}>
          <form
            method="post"
            className="space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <ShippingAddressFormFields form={form} />

            <div className="flex gap-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}{" "}
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

const ShippingAddressFormFields = ({
  form,
}: {
  form: ReturnType<typeof useForm<z.infer<typeof shippingSchema>>>;
}) => {
  const { shippingAddressfields } = SHIPPING_CONSTANTS.form;

  return shippingAddressfields.map((fld: FormShippingAddressField) => (
    <div className="flex flex-col md:flex-row gap-5" key={fld.name}>
      <FormField
        control={form.control}
        name={fld.name as ShippingAddressFormFields}
        render={({
          field,
        }: {
          field: ControllerRenderProps<
            z.infer<typeof shippingSchema>,
            ShippingAddressFormFields
          >;
        }) => (
          <FormItem className="w-full">
            <FormLabel>{fld.label}</FormLabel>
            <FormControl>
              <Input placeholder={fld.placeholder} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  ));
};

export default ShippingAddressForm;
