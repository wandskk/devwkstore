"use client";

import React from "react";
import { checkoutStepsData } from "@/lib/constants/CheckoutStepsData";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

const CheckoutSteps = () => {
  const pathname = usePathname();
  const currentStep = checkoutStepsData.findIndex((step) =>
    pathname.includes(step.href)
  );  

  return (
    <div className="flex-between flex-col md:flex-row space-x-2 space-y-2 mb-10">
      {checkoutStepsData.map((step, index) => {
        return (
          <React.Fragment key={step.label}>
            <Link
              href={step.href}
              className={cn(
                "p-2 w-56 rounded-full text-center text-sm",
                index === currentStep && "bg-secondary"
              )}
            >
              {step.label}
            </Link>
            {step.label !== "Place Order" && (
              <hr className="w-16 border-t border-gray-300 mx-2" />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default CheckoutSteps;
