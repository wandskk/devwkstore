"use client";

import { useRouter } from "next/navigation";
import { Check, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { createOrder } from "@/lib/actions/order.actions";

const PlaceOrderForm = () => {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createOrder();
    
    if (res.redirectTo) router.push(res.redirectTo);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <PlaceOrderButton />
    </form>
  );
};

const PlaceOrderButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className="w-full flex items-center justify-center"
      disabled={pending}
    >
      {pending ? (
        <Loader className="w-4 h-4 animate-spin" />
      ) : (
        <>
          <Check className="w-4 h-4" />
          {"Place Order"}
        </>
      )}
    </Button>
  );
};

export default PlaceOrderForm;
