export interface PaypalAccessTokenResponse {
  scope: string;
  access_token: string;
  token_type: string;
  app_id: string;
  expires_in: number;
  nonce: string;
}

export interface PaypalOrderResponse {
  id: string;
  status: string;
  links: PaypalLink[];
}

export interface PaypalLink {
  href: string;
  rel: string;
  method: string;
}

export interface PaypalAmountWithCurrency {
  currency_code: string;
  value: string;
}

export interface PaypalPurchaseUnit {
  reference_id?: string;
  description?: string;
  amount: PaypalAmountWithCurrency;
  payee?: Record<string, string>;
  items?: Record<string, unknown>[];
  shipping?: Record<string, unknown>;
}

export interface PaypalPaymentSource {
  paypal?: Record<string, unknown>;
  card?: Record<string, unknown>;
  [key: string]: Record<string, unknown> | undefined;
}

export interface PaypalPayer {
  name?: {
    given_name: string;
    surname: string;
  };
  email_address?: string;
  payer_id?: string;
  address?: Record<string, unknown>;
}

export interface PaypalCaptureResponse {
  id: string;
  status: string;
  payment_source: PaypalPaymentSource;
  purchase_units: PaypalPurchaseUnit[];
  payer: PaypalPayer;
  links: PaypalLink[];
}
