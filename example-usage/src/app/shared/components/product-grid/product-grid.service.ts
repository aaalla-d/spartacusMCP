/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// Mock Angular Injectable decorator
function Injectable(options?: any) {
  return function(target: any) {
    return target;
  };
}

// Mock Observable interface
interface Observable<T> {
  subscribe(observer: (value: T) => void): void;
}

// Mock RxJS implementations
const of = <T>(value: T): Observable<T> => ({
  subscribe: (observer: (value: T) => void) => observer(value)
});

class MockBehaviorSubject<T> {
  private currentValue: T;
  
  constructor(initialValue: T) {
    this.currentValue = initialValue;
  }
  
  next(value: T): void {
    this.currentValue = value;
  }
  
  get value(): T {
    return this.currentValue;
  }
  
  asObservable(): Observable<T> {
    return of(this.currentValue);
  }
}

import { Product, AddToCartEvent } from './models/product-grid.model';

@Injectable({
  providedIn: 'root',
})
export class ProductGridService {
  private productsSubject = new MockBehaviorSubject<Product[]>([]);
  private cartSubject = new MockBehaviorSubject<AddToCartEvent[]>([]);

  constructor() {
    // Initialize with mock data
    this.loadMockProducts();
  }

  getProducts(): Observable<Product[]> {
    return this.productsSubject.asObservable();
  }

  loadProducts(maxItems: number = 12): Observable<Product[]> {
    // Mock implementation - in real app, this would call Spartacus ProductService
    const products = this.getMockProducts().slice(0, maxItems);
    return of(products);
  }

  addToCart(product: Product, quantity: number = 1): void {
    const cartEvent: AddToCartEvent = { product, quantity };
    const currentCart = this.cartSubject.value || [];
    this.cartSubject.next([...currentCart, cartEvent]);
    
    // TODO: Integrate with Spartacus CartService
    console.log('Added to cart:', product.name, 'Quantity:', quantity);
  }

  navigateToProduct(productId: string): void {
    // TODO: Integrate with Spartacus Router
    console.log('Navigate to product:', productId);
  }

  searchProducts(query: string): Observable<Product[]> {
    const filteredProducts = this.getMockProducts().filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(query.toLowerCase()))
    );
    return of(filteredProducts);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    const filteredProducts = this.getMockProducts().filter(product => 
      product.categories && product.categories.includes(category)
    );
    return of(filteredProducts);
  }

  private loadMockProducts(): void {
    const mockProducts = this.getMockProducts();
    this.productsSubject.next(mockProducts);
  }

  private getMockProducts(): Product[] {
    return [
      {
        id: 'prod-001',
        name: 'Premium Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: {
          value: 299.99,
          currency: 'USD',
          formattedValue: '$299.99',
          salePrice: {
            value: 249.99,
            currency: 'USD',
            formattedValue: '$249.99'
          }
        },
        images: [{
          url: 'https://via.placeholder.com/300x300/1a1a1a/86BC24?text=Headphones',
          alt: 'Premium Wireless Headphones',
          imageType: 'PRIMARY'
        }],
        rating: {
          average: 4.5,
          count: 128,
          maxRating: 5
        },
        availability: {
          inStock: true,
          stockLevel: 15,
          stockLevelStatus: 'IN_STOCK'
        },
        categories: ['Electronics', 'Audio'],
        brand: 'TechBrand',
        sku: 'TB-WH-001'
      },
      {
        id: 'prod-002',
        name: 'Smart Fitness Watch',
        description: 'Advanced fitness tracking with heart rate monitoring',
        price: {
          value: 199.99,
          currency: 'USD',
          formattedValue: '$199.99'
        },
        images: [{
          url: 'https://via.placeholder.com/300x300/1a1a1a/86BC24?text=Watch',
          alt: 'Smart Fitness Watch',
          imageType: 'PRIMARY'
        }],
        rating: {
          average: 4.2,
          count: 89,
          maxRating: 5
        },
        availability: {
          inStock: true,
          stockLevel: 8,
          stockLevelStatus: 'LOW_STOCK'
        },
        categories: ['Electronics', 'Fitness'],
        brand: 'FitTech',
        sku: 'FT-SW-002'
      },
      {
        id: 'prod-003',
        name: 'Ergonomic Office Chair',
        description: 'Comfortable office chair with lumbar support',
        price: {
          value: 449.99,
          currency: 'USD',
          formattedValue: '$449.99'
        },
        images: [{
          url: 'https://via.placeholder.com/300x300/1a1a1a/86BC24?text=Chair',
          alt: 'Ergonomic Office Chair',
          imageType: 'PRIMARY'
        }],
        rating: {
          average: 4.7,
          count: 156,
          maxRating: 5
        },
        availability: {
          inStock: true,
          stockLevel: 12,
          stockLevelStatus: 'IN_STOCK'
        },
        categories: ['Furniture', 'Office'],
        brand: 'ComfortPlus',
        sku: 'CP-OC-003'
      },
      {
        id: 'prod-004',
        name: 'Wireless Gaming Mouse',
        description: 'High-precision gaming mouse with RGB lighting',
        price: {
          value: 79.99,
          currency: 'USD',
          formattedValue: '$79.99'
        },
        images: [{
          url: 'https://via.placeholder.com/300x300/1a1a1a/86BC24?text=Mouse',
          alt: 'Wireless Gaming Mouse',
          imageType: 'PRIMARY'
        }],
        rating: {
          average: 4.3,
          count: 67,
          maxRating: 5
        },
        availability: {
          inStock: false,
          stockLevel: 0,
          stockLevelStatus: 'OUT_OF_STOCK'
        },
        categories: ['Electronics', 'Gaming'],
        brand: 'GameTech',
        sku: 'GT-GM-004'
      }
    ];
  }
} 