import { FormShippingAddressField } from "@/lib/types/forms";

export const SHIPPING_CONSTANTS = {
  form: {
    shippingAddressfields: [
      {
        name: "fullName",
        label: "Full Name",
        placeholder: "Enter full name",
      },
      {
        name: "streetAddress",
        label: "Address",
        placeholder: "Enter address",
      },
      {
        name: "city",
        label: "City",
        placeholder: "Enter city",
      },
      {
        name: "postalCode",
        label: "Postal Code",
        placeholder: "Enter postal code",
      },
      {
        name: "country",
        label: "Country",
        placeholder: "Enter country",
      },
    ] as FormShippingAddressField[],
  },
};
