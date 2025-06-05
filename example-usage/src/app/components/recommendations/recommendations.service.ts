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
  subscribe(observer: any): void;
}

// Mock RxJS implementations
const of = <T>(value: T): Observable<T> => ({
  subscribe: (observer: any) => {
    if (typeof observer === 'function') {
      observer(value);
    } else if (observer.next) {
      observer.next(value);
    }
  }
});

import { Product } from '../product-grid/models/product-grid.model';
import { RecommendationConfig } from './recommendations.component';

export interface RecommendationAnalytics {
  productId: string;
  recommendationType: string;
  timestamp: Date;
  userId?: string;
  sessionId?: string;
}

@Injectable({
  providedIn: 'root',
})
export class RecommendationsService {
  private analyticsData: RecommendationAnalytics[] = [];

  constructor() {}

  getRecommendations(config: RecommendationConfig): Observable<Product[]> {
    // Mock implementation - in real app, this would call recommendation API
    const mockRecommendations = this.generateMockRecommendations(config);
    return of(mockRecommendations);
  }

  trackProductClick(product: Product, recommendationType: string): void {
    const analytics: RecommendationAnalytics = {
      productId: product.id,
      recommendationType,
      timestamp: new Date(),
      // TODO: Add real user and session tracking
    };
    
    this.analyticsData.push(analytics);
    console.log('Tracked product click:', analytics);
  }

  trackAddToCart(product: Product, recommendationType: string): void {
    const analytics: RecommendationAnalytics = {
      productId: product.id,
      recommendationType: `${recommendationType}_ADD_TO_CART`,
      timestamp: new Date(),
    };
    
    this.analyticsData.push(analytics);
    console.log('Tracked add to cart:', analytics);
  }

  addToCart(product: Product, quantity: number = 1): void {
    // TODO: Integrate with Spartacus CartService
    console.log('Added to cart from recommendations:', product.name, 'Quantity:', quantity);
  }

  navigateToProduct(productId: string): void {
    // TODO: Integrate with Spartacus Router
    console.log('Navigate to product from recommendations:', productId);
  }

  getSimilarProducts(productId: string, maxItems: number = 8): Observable<Product[]> {
    const similarProducts = this.generateMockRecommendations({
      title: 'Similar Products',
      maxItems,
      recommendationType: 'SIMILAR',
      showPrices: true,
      autoScroll: false,
      layout: 'grid',
      strategy: 'content-based'
    });
    return of(similarProducts);
  }

  getFrequentlyBoughtTogether(productId: string, maxItems: number = 4): Observable<Product[]> {
    const frequentlyBought = this.generateMockRecommendations({
      title: 'Frequently Bought Together',
      maxItems,
      recommendationType: 'FREQUENTLY_BOUGHT',
      showPrices: true,
      autoScroll: false,
      layout: 'list',
      strategy: 'collaborative'
    });
    return of(frequentlyBought);
  }

  getTrendingProducts(maxItems: number = 12): Observable<Product[]> {
    const trending = this.generateMockRecommendations({
      title: 'Trending Now',
      maxItems,
      recommendationType: 'TRENDING',
      showPrices: true,
      autoScroll: true,
      layout: 'carousel',
      strategy: 'hybrid'
    });
    return of(trending);
  }

  private generateMockRecommendations(config: RecommendationConfig): Product[] {
    const baseProducts: Product[] = [
      {
        id: 'rec-001',
        name: 'Bluetooth Speaker',
        description: 'Portable wireless speaker with premium sound',
        price: {
          value: 89.99,
          currency: 'USD',
          formattedValue: '$89.99'
        },
        images: [{
          url: 'https://via.placeholder.com/300x300/1a1a1a/86BC24?text=Speaker',
          alt: 'Bluetooth Speaker',
          imageType: 'PRIMARY'
        }],
        rating: {
          average: 4.4,
          count: 92,
          maxRating: 5
        },
        availability: {
          inStock: true,
          stockLevel: 25,
          stockLevelStatus: 'IN_STOCK'
        },
        categories: ['Electronics', 'Audio'],
        brand: 'SoundTech'
      },
      {
        id: 'rec-002',
        name: 'Laptop Stand',
        description: 'Adjustable aluminum laptop stand for better ergonomics',
        price: {
          value: 49.99,
          currency: 'USD',
          formattedValue: '$49.99'
        },
        images: [{
          url: 'https://via.placeholder.com/300x300/1a1a1a/86BC24?text=Stand',
          alt: 'Laptop Stand',
          imageType: 'PRIMARY'
        }],
        rating: {
          average: 4.6,
          count: 156,
          maxRating: 5
        },
        availability: {
          inStock: true,
          stockLevel: 18,
          stockLevelStatus: 'IN_STOCK'
        },
        categories: ['Accessories', 'Office'],
        brand: 'ErgoTech'
      },
      {
        id: 'rec-003',
        name: 'Wireless Charger',
        description: 'Fast wireless charging pad for smartphones',
        price: {
          value: 29.99,
          currency: 'USD',
          formattedValue: '$29.99'
        },
        images: [{
          url: 'https://via.placeholder.com/300x300/1a1a1a/86BC24?text=Charger',
          alt: 'Wireless Charger',
          imageType: 'PRIMARY'
        }],
        rating: {
          average: 4.2,
          count: 78,
          maxRating: 5
        },
        availability: {
          inStock: true,
          stockLevel: 32,
          stockLevelStatus: 'IN_STOCK'
        },
        categories: ['Electronics', 'Accessories'],
        brand: 'ChargeTech'
      }
    ];

    // Return products based on config
    return baseProducts.slice(0, config.maxItems);
  }

  getAnalyticsData(): RecommendationAnalytics[] {
    return [...this.analyticsData];
  }

  clearAnalyticsData(): void {
    this.analyticsData = [];
  }
} 