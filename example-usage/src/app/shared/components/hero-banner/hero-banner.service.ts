/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// Mock interfaces for dependencies
interface Observable<T> {
  subscribe(observer: any): any;
  pipe(...operators: any[]): Observable<T>;
}

interface BehaviorSubject<T> {
  value: T;
  next(value: T): void;
  asObservable(): Observable<T>;
}

function createBehaviorSubject<T>(initialValue: T): BehaviorSubject<T> {
  let currentValue = initialValue;
  const observers: any[] = [];

  return {
    get value() {
      return currentValue;
    },
    next(value: T) {
      currentValue = value;
      observers.forEach(observer => observer(value));
    },
    asObservable(): Observable<T> {
      return {
        subscribe(observer: any) {
          observers.push(observer);
          observer(currentValue);
          return {
            unsubscribe() {
              const index = observers.indexOf(observer);
              if (index > -1) observers.splice(index, 1);
            }
          };
        },
        pipe(...operators: any[]) {
          return this;
        }
      };
    }
  };
}

import { HeroBannerConfig, HeroBannerAnalytics } from './models/hero-banner.model';

export class HeroBannerService {
  private loadingSubject = createBehaviorSubject<boolean>(false);
  private mobileSubject = createBehaviorSubject<boolean>(false);
  private analyticsSubject = createBehaviorSubject<HeroBannerAnalytics>({
    impressions: 0,
    clicks: 0,
    conversionRate: 0,
    lastUpdated: new Date()
  });

  public isLoading$ = this.loadingSubject.asObservable();
  public isMobile$ = this.mobileSubject.asObservable();
  public analytics$ = this.analyticsSubject.asObservable();

  constructor() {
    this.initializeResponsiveHandling();
  }

  setupResponsiveHandling(): Observable<boolean> {
    if (typeof window !== 'undefined') {
      // Mock implementation of fromEvent and operators
      const mockObservable: Observable<boolean> = {
        subscribe: (observer: any) => {
          const handleResize = () => observer(this.checkIfMobile());
          window.addEventListener('resize', handleResize);
          handleResize(); // Initial call
          return {
            unsubscribe: () => window.removeEventListener('resize', handleResize)
          };
        },
        pipe: (...operators: any[]) => mockObservable
      };
      return mockObservable;
    }
    return createBehaviorSubject(false).asObservable();
  }

  private initializeResponsiveHandling(): void {
    this.setupResponsiveHandling().subscribe((isMobile: boolean) => {
      this.mobileSubject.next(isMobile);
    });
  }

  private checkIfMobile(): boolean {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  }

  trackCtaClick(ctaText: string, ctaLink: string): void {
    const currentAnalytics = this.analyticsSubject.value;
    const updatedAnalytics: HeroBannerAnalytics = {
      ...currentAnalytics,
      clicks: currentAnalytics.clicks + 1,
      conversionRate: this.calculateConversionRate(
        currentAnalytics.impressions,
        currentAnalytics.clicks + 1
      ),
      lastUpdated: new Date()
    };

    this.analyticsSubject.next(updatedAnalytics);

    // Track analytics event (would integrate with actual analytics service)
    this.trackEvent('hero_banner', 'click', ctaText, ctaLink);
  }

  trackImpression(): void {
    const currentAnalytics = this.analyticsSubject.value;
    const updatedAnalytics: HeroBannerAnalytics = {
      ...currentAnalytics,
      impressions: currentAnalytics.impressions + 1,
      conversionRate: this.calculateConversionRate(
        currentAnalytics.impressions + 1,
        currentAnalytics.clicks
      ),
      lastUpdated: new Date()
    };

    this.analyticsSubject.next(updatedAnalytics);
  }

  private calculateConversionRate(impressions: number, clicks: number): number {
    if (impressions === 0) return 0;
    return (clicks / impressions) * 100;
  }

  private trackEvent(category: string, action: string, label: string, value?: string): void {
    // Mock analytics tracking - would integrate with actual analytics service
    console.log('Analytics Event:', {
      category,
      action,
      label,
      value,
      timestamp: new Date().toISOString()
    });
  }

  setLoading(loading: boolean): void {
    this.loadingSubject.next(loading);
  }

  getDefaultConfig(): HeroBannerConfig {
    return {
      title: 'Welcome to Our Store',
      subtitle: 'Discover amazing products at great prices',
      ctaText: 'Shop Now',
      ctaLink: '/products',
      overlay: true,
      textAlign: 'center',
      height: 'large',
      animation: true,
      accessibility: {
        ariaLabel: 'Hero banner with promotional content',
        altText: 'Store promotional banner'
      },
      tracking: {
        category: 'hero_banner',
        action: 'view',
        label: 'homepage_hero'
      }
    };
  }

  validateConfig(config: HeroBannerConfig): boolean {
    // Basic validation
    if (!config.title && !config.subtitle && !config.backgroundImage) {
      console.warn('Hero banner should have at least a title, subtitle, or background image');
      return false;
    }

    if (config.ctaText && !config.ctaLink) {
      console.warn('Hero banner CTA text provided but no link specified');
      return false;
    }

    return true;
  }
} 