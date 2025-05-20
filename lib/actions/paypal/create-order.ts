import { generatePaypalAccessToken } from "@/lib/helpers/paypal.helpers";
import { PAYPAL_CONSTANTS } from "@/lib/constants/paypal";
import { PaypalOrderResponse } from "@/lib/types/paypal.types";

const { apiUrl } = PAYPAL_CONSTANTS;


export async function createPaypalOrder(
  amount: string,
  currency: string = "USD"
): Promise<PaypalOrderResponse> {
  const accessToken = await generatePaypalAccessToken();

  const response = await fetch(`${apiUrl}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount,
          },
        },
      ],
    }),
  });

  if (response.ok) {
    return await response.json();
  } else {
    const errorData = await response.text();
    throw new Error(errorData);
  }
} 