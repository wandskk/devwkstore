// Tipos para respostas da API do PayPal

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

export interface PaypalCaptureResponse {
  id: string;
  status: string;
  payment_source: any;
  purchase_units: any[];
  payer: any;
  links: PaypalLink[];
}
