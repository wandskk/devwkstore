import { getPaypalAccessToken } from "@/lib/utils/paypal.utils";
import { PAYPAL_CONSTANTS } from "@/lib/constants/paypal";
import { PaypalCaptureResponse } from "@/lib/types/paypal.types";

const { apiUrl } = PAYPAL_CONSTANTS;

export async function capturePaypalPayment(orderId: string): Promise<PaypalCaptureResponse> {
  const accessToken = await getPaypalAccessToken();

  const response = await fetch(
    `${apiUrl}/v2/checkout/orders/${orderId}/capture`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.ok) {
    return await response.json();
  } else {
    const errorData = await response.text();
    throw new Error(errorData);
  }
} 