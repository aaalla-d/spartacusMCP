/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: Price;
  images?: ProductImage[];
  rating?: ProductRating;
  availability?: ProductAvailability;
  categories?: string[];
  brand?: string;
  sku?: string;
  url?: string;
}

export interface Price {
  value: number;
  currency: string;
  formattedValue: string;
  salePrice?: {
    value: number;
    currency: string;
    formattedValue: string;
  };
}

export interface ProductImage {
  url: string;
  alt?: string;
  format?: string;
  imageType?: 'PRIMARY' | 'GALLERY' | 'THUMBNAIL';
}

export interface ProductRating {
  average: number;
  count: number;
  maxRating: number;
}

export interface ProductAvailability {
  inStock: boolean;
  stockLevel?: number;
  stockLevelStatus?: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
}

export interface ProductGridConfig {
  columns: number;
  showPrices: boolean;
  showRatings: boolean;
  showAddToCart: boolean;
  title: string;
  maxItems: number;
  responsive: boolean;
  accessibility: boolean;
}

export interface ProductGridData {
  products: Product[];
  totalResults: number;
  currentPage: number;
  totalPages: number;
}

export interface AddToCartEvent {
  product: Product;
  quantity: number;
}

export interface ProductClickEvent {
  product: Product;
  event: MouseEvent | KeyboardEvent;
} 