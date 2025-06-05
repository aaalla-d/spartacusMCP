/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Configuration interface for the Midnight Black Theme
 */
export interface ThemeConfig {
  /**
   * Primary color for main UI elements
   */
  primaryColor: string;

  /**
   * Secondary color for supporting elements
   */
  secondaryColor: string;

  /**
   * Background color for the main content area
   */
  backgroundColor: string;

  /**
   * Text color for readable content
   */
  textColor: string;

  /**
   * Accent color for highlights and interactive elements
   */
  accentColor: string;

  /**
   * Border color for separators and outlines
   */
  borderColor: string;

  /**
   * Shadow color for depth and elevation effects
   */
  shadowColor: string;
}

/**
 * Theme variation names available in the system
 */
export type ThemeVariation = 
  | 'default'
  | 'highContrast'
  | 'softDark'
  | 'blueAccent'
  | 'greenAccent'
  | 'purpleAccent';

/**
 * Theme state interface for managing theme status
 */
export interface ThemeState {
  /**
   * Current theme configuration
   */
  config: ThemeConfig;

  /**
   * Whether the theme is currently active
   */
  isActive: boolean;

  /**
   * Current theme variation name
   */
  variation: ThemeVariation;

  /**
   * Timestamp when theme was last applied
   */
  lastApplied: number;
}

/**
 * Theme storage data structure for localStorage
 */
export interface ThemeStorageData {
  /**
   * Theme configuration
   */
  config: ThemeConfig;

  /**
   * Active state
   */
  isActive: boolean;

  /**
   * Storage timestamp
   */
  timestamp: number;

  /**
   * Theme variation name
   */
  variation?: ThemeVariation;
}

/**
 * Theme customization options for advanced users
 */
export interface ThemeCustomization {
  /**
   * Custom CSS properties to override
   */
  customProperties?: { [key: string]: string };

  /**
   * Additional CSS classes to apply
   */
  additionalClasses?: string[];

  /**
   * Font family override
   */
  fontFamily?: string;

  /**
   * Border radius override
   */
  borderRadius?: string;

  /**
   * Transition duration override
   */
  transitionDuration?: string;
}

/**
 * Complete theme configuration with customization options
 */
export interface ExtendedThemeConfig extends ThemeConfig {
  /**
   * Theme customization options
   */
  customization?: ThemeCustomization;

  /**
   * Theme metadata
   */
  metadata?: {
    name: string;
    description: string;
    author: string;
    version: string;
    tags: string[];
  };
}

/**
 * Theme preset definitions
 */
export interface ThemePreset {
  /**
   * Preset name
   */
  name: string;

  /**
   * Preset display name
   */
  displayName: string;

  /**
   * Preset description
   */
  description: string;

  /**
   * Theme configuration
   */
  config: ThemeConfig;

  /**
   * Preview image URL
   */
  previewImage?: string;

  /**
   * Whether this is a built-in preset
   */
  isBuiltIn: boolean;
}

/**
 * Color palette interface for theme colors
 */
export interface ColorPalette {
  /**
   * Primary colors
   */
  primary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };

  /**
   * Accent colors
   */
  accent: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };

  /**
   * Neutral/gray colors
   */
  neutral: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
}

/**
 * Accessibility configuration for themes
 */
export interface ThemeAccessibility {
  /**
   * High contrast mode enabled
   */
  highContrast: boolean;

  /**
   * Reduced motion enabled
   */
  reducedMotion: boolean;

  /**
   * Large text mode enabled
   */
  largeText: boolean;

  /**
   * Focus indicators enhanced
   */
  enhancedFocus: boolean;

  /**
   * Color blind friendly mode
   */
  colorBlindFriendly: boolean;
}

/**
 * Theme event types for notifications
 */
export type ThemeEventType = 
  | 'theme-applied'
  | 'theme-removed'
  | 'theme-updated'
  | 'theme-reset'
  | 'variation-changed';

/**
 * Theme event data structure
 */
export interface ThemeEvent {
  /**
   * Event type
   */
  type: ThemeEventType;

  /**
   * Theme configuration at time of event
   */
  config: ThemeConfig;

  /**
   * Event timestamp
   */
  timestamp: number;

  /**
   * Additional event data
   */
  data?: any;
} 