import { generatePaypalAccessToken } from "@/lib/helpers/paypal.helpers";

interface TokenCache {
  token: string;
  expiresAt: number;
}

let tokenCache: TokenCache | null = null;

const SAFETY_MARGIN = 5 * 60 * 1000;

export const getPaypalAccessToken = async (): Promise<string> => {
  const now = Date.now();
  
  if (tokenCache && tokenCache.expiresAt > now + SAFETY_MARGIN) {
    return tokenCache.token;
  }
  
  const token = await generatePaypalAccessToken();
  
  tokenCache = {
    token,
    expiresAt: now + (7 * 60 * 60 * 1000) + (55 * 60 * 1000)
  };
  
  return token;
} 