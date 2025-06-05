/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface HeroBannerConfig {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
  overlay?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  height?: 'small' | 'medium' | 'large' | 'full';
  animation?: boolean;
  mobileBackgroundImage?: string;
  tabletBackgroundImage?: string;
  desktopBackgroundImage?: string;
  accessibility?: {
    ariaLabel?: string;
    altText?: string;
  };
  tracking?: {
    category?: string;
    action?: string;
    label?: string;
  };
}

export interface HeroBannerData {
  config: HeroBannerConfig;
  isLoading: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export interface HeroBannerAnalytics {
  impressions: number;
  clicks: number;
  conversionRate: number;
  lastUpdated: Date;
} 