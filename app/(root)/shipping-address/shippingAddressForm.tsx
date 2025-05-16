"use client";

import React, { useTransition } from "react";
import { ShippingAddress } from "@/types/shippingAddress";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { shippingAddressSchema } from "@/lib/validators/shippingAddress";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { shippingAddressDefaultValues } from "@/lib/constants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formShippingAddressfields } from "@/lib/constants/formShippingAddressfields";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader } from "lucide-react";

type ShippingAddressFormFields = keyof z.infer<typeof shippingAddressSchema>;

const ShippingAddressForm = ({ address }: { address: ShippingAddress }) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof shippingAddressSchema>>({
    resolver: zodResolver(shippingAddressSchema),
    defaultValues: address || shippingAddressDefaultValues,
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = (values: z.infer<typeof shippingAddressSchema>) => {
    console.log(values);
    return;
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
  form: ReturnType<typeof useForm<z.infer<typeof shippingAddressSchema>>>;
}) => {
  return formShippingAddressfields.map((fld) => (
    <div className="flex flex-col md:flex-row gap-5" key={fld.name}>
      <FormField
        control={form.control}
        name={fld.name as ShippingAddressFormFields}
        render={({
          field,
        }: {
          field: ControllerRenderProps<
            z.infer<typeof shippingAddressSchema>,
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
