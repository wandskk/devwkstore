"use client";

import React from "react";
import { Cart, CartItem } from "@/types/cart";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { ToastAction } from "@/components/ui/toast";
import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";

const AddToCart = ({ cart, item }: { cart?: Cart; item: CartItem }) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleAddToCart = async () => {
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
  };

  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  if (existItem) {
    const handleRemoveFromCart = async () => {
      const res = await removeItemFromCart(item.productId);

      toast({
        variant: res.success ? "default" : "destructive",
        description: res.message,
      });

      return;
    };

    return (
      <div>
        <Button type="button" variant="outline" onClick={handleRemoveFromCart}>
          <Minus className="h-4 w-4" />
        </Button>
        <span className="px-2">{existItem.qty}</span>
        <Button type="button" variant="outline" onClick={handleAddToCart}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      <Plus /> Add To Cart
    </Button>
  );
};

export default AddToCart;
