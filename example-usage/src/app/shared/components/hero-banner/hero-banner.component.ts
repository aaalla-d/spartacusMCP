/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// Mock Angular Core interfaces for demonstration
interface Component {
  selector: string;
  templateUrl: string;
  styleUrls: string[];
  changeDetection?: any;
  encapsulation?: any;
}

interface Input {}
interface HostBinding {}

// Mock RxJS interfaces
interface Observable<T> {
  subscribe(observer: any): any;
  pipe(...operators: any[]): Observable<T>;
}

interface Subject<T> {
  next(value: T): void;
  complete(): void;
}

// Mock Spartacus Core interfaces
interface ConfigService {
  get(key: string): any;
}

interface WindowRef {
  nativeWindow: Window | undefined;
}

import { HeroBannerConfig } from './models/hero-banner.model';
import { HeroBannerService } from './hero-banner.service';

// Component decorator mock
function Component(config: any) {
  return function(target: any) {
    target.componentConfig = config;
    return target;
  };
}

// Input decorator mock
function Input() {
  return function(target: any, propertyKey: string) {
    // Mock implementation
  };
}

// HostBinding decorator mock
function HostBinding(binding: string) {
  return function(target: any, propertyKey: string) {
    // Mock implementation
  };
}

@Component({
  selector: 'cx-hero-banner',
  templateUrl: './hero-banner.component.html',
  styleUrls: ['./hero-banner.component.scss'],
  changeDetection: 'OnPush',
  encapsulation: 'None',
})
export class HeroBannerComponent {
  private destroy$ = {
    next: () => {},
    complete: () => {}
  };

  @HostBinding('class.cx-hero-banner') hostClass = true;
  @HostBinding('attr.role') role = 'banner';
  @HostBinding('attr.aria-label') ariaLabel = 'Hero banner';

  @Input() config: HeroBannerConfig = {};
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() backgroundImage: string = '';
  @Input() ctaText: string = 'Shop Now';
  @Input() ctaLink: string = '/';
  @Input() overlay: boolean = true;
  @Input() textAlign: 'left' | 'center' | 'right' = 'center';
  @Input() height: 'small' | 'medium' | 'large' | 'full' = 'large';
  @Input() animation: boolean = true;

  isLoading$: Observable<boolean>;
  isMobile$: Observable<boolean>;

  constructor(
    private configService?: ConfigService,
    private windowRef?: WindowRef,
    private heroBannerService?: HeroBannerService
  ) {
    // Mock observables
    this.isLoading$ = {
      subscribe: (observer: any) => observer(false),
      pipe: (...operators: any[]) => this.isLoading$
    };
    this.isMobile$ = {
      subscribe: (observer: any) => observer(false),
      pipe: (...operators: any[]) => this.isMobile$
    };
  }

  ngOnInit(): void {
    this.initializeConfig();
    this.setupResponsiveHandling();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeConfig(): void {
    const defaultConfig = this.configService?.get('heroBanner') || {};
    this.config = { ...defaultConfig, ...this.config };
    
    // Apply config values to component inputs
    if (this.config.title) this.title = this.config.title;
    if (this.config.subtitle) this.subtitle = this.config.subtitle;
    if (this.config.backgroundImage) this.backgroundImage = this.config.backgroundImage;
    if (this.config.ctaText) this.ctaText = this.config.ctaText;
    if (this.config.ctaLink) this.ctaLink = this.config.ctaLink;
    if (this.config.overlay !== undefined) this.overlay = this.config.overlay;
    if (this.config.textAlign) this.textAlign = this.config.textAlign;
    if (this.config.height) this.height = this.config.height;
    if (this.config.animation !== undefined) this.animation = this.config.animation;
  }

  private setupResponsiveHandling(): void {
    if (this.heroBannerService) {
      this.heroBannerService.setupResponsiveHandling().subscribe();
    }
  }

  onCtaClick(): void {
    if (this.heroBannerService) {
      this.heroBannerService.trackCtaClick(this.ctaText, this.ctaLink);
    }
  }

  getBackgroundStyle(): { [key: string]: string } {
    const styles: { [key: string]: string } = {};
    
    if (this.backgroundImage) {
      styles['background-image'] = `url(${this.backgroundImage})`;
      styles['background-size'] = 'cover';
      styles['background-position'] = 'center';
      styles['background-repeat'] = 'no-repeat';
    }
    
    return styles;
  }

  getHeightClass(): string {
    return `cx-hero-banner--${this.height}`;
  }

  getTextAlignClass(): string {
    return `cx-hero-banner--text-${this.textAlign}`;
  }

  getAnimationClass(): string {
    return this.animation ? 'cx-hero-banner--animated' : '';
  }

  hasContent(): boolean {
    return !!(this.title || this.subtitle || this.ctaText);
  }
} 