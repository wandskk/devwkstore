"use client";

import React from "react";
import { Cart, CartItem } from "@/lib/types/cart.types";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { ToastAction } from "@/components/ui/toast";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart";

const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  const router = useRouter();
  const { toast } = useToast();

  const [isPending, startTransition] = React.useTransition();

  const handleActions = {
    addToCart: async () => {
      startTransition(async () => {
        const res = await addItemToCart(item);

        if (!res.success) {
          toast({
            variant: "destructive",
            description: res.message,
          });
          return;
        }

        toast({
          description: res.message,
          action: (
            <ToastAction
              className="bg-primary text-white hover:bg-gray-800"
              altText="Go To Cart"
              onClick={() => router.push("/cart")}
            >
              Go To Cart
            </ToastAction>
          ),
        });
      });
    },
    removeFromCart: async () => {
      startTransition(async () => {
        const res = await removeItemFromCart(item.productId);

        toast({
          variant: res.success ? "default" : "destructive",
          description: res.message,
        });

        return;
      });
    },
  };

  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div>
      <Button
        disabled={isPending}
        type="button"
        variant="outline"
        onClick={() => handleActions.removeFromCart()}
      >
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Minus className="h-4 w-4" />
        )}
      </Button>
      <span className="px-2">{existItem?.qty}</span>
      <Button
        disabled={isPending}
        type="button"
        variant="outline"
        onClick={() => handleActions.addToCart()}
      >
        {isPending ? (
          <Loader className="w-4 h-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button
      disabled={isPending}
      className="w-full"
      type="button"
      onClick={() => handleActions.addToCart()}
    >
      <Plus /> Add To Cart
    </Button>
  );
};

export default AddToCart;
