import { CheckoutStepNavigation } from "../types/checkout";

export const CHECKOUT_CONSTANTS = {
  navigation: [
    {
      label: "User Login",
      href: "#",
    },
    {
      label: "Shipping Address",
      href: "/shipping-address",
    },
    {
      label: "Payment Method",
      href: "/payment-method",
    },
    {
      label: "Place Order",
      href: "/place-order",
    },
  ] as CheckoutStepNavigation[],
};
