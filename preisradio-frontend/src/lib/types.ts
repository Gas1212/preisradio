// Types TypeScript pour l'API PrixRadio

export interface Retailer {
  id: string;
  name: string;
  slug: string;
  website: string;
  logo?: string;
}

export interface Price {
  retailer: Retailer;
  price: number;
  currency: string;
  stock_status: 'in_stock' | 'out_of_stock' | 'preorder' | 'discontinued';
  url: string;
  last_checked: string;
}

export interface Product {
  id: string;
  ean: string;
  name: string;
  description?: string;
  category: string;
  image?: string;
  prices: Price[];
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface HealthResponse {
  status: string;
  message: string;
  timestamp: string;
}

export interface StatusResponse {
  status: string;
  version: string;
  api: {
    products: number;
    retailers: number;
  };
  database: {
    status: string;
    collections: string[];
  };
}
