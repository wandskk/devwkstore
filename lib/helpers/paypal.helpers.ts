import { PAYPAL_CONSTANTS } from "@/lib/constants/paypal";
import { PaypalAccessTokenResponse } from "@/lib/types/paypal.types";

const { apiUrl, clientId, appSecret } = PAYPAL_CONSTANTS;

export const generatePaypalAccessToken = async (): Promise<string> => {
  const auth = Buffer.from(`${clientId}:${appSecret}`).toString("base64");

  const response = await fetch(`${apiUrl}/v1/oauth2/token`, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (response.ok) {
    const jsonData = await response.json() as PaypalAccessTokenResponse;
    return jsonData.access_token;
  } else {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}; 