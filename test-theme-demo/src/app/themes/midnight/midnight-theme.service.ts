/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ThemeConfig } from './models/theme-config.model';

@Injectable({
  providedIn: 'root'
})
export class MidnightThemeService {
  private readonly THEME_STORAGE_KEY = 'spartacus-midnight-theme';
  private readonly DEFAULT_THEME_CONFIG: ThemeConfig = {
    primaryColor: '#000000',
    secondaryColor: '#1a1a1a',
    backgroundColor: '#0d0d0d',
    textColor: '#ffffff',
    accentColor: '#ff6b35',
    borderColor: '#333333',
    shadowColor: 'rgba(255, 255, 255, 0.1)'
  };

  private themeConfigSubject = new BehaviorSubject<ThemeConfig>(this.DEFAULT_THEME_CONFIG);
  private isActiveSubject = new BehaviorSubject<boolean>(false);

  /**
   * Observable for theme configuration changes
   */
  public themeConfig$: Observable<ThemeConfig> = this.themeConfigSubject.asObservable();

  /**
   * Observable for theme active state
   */
  public isActive$: Observable<boolean> = this.isActiveSubject.asObservable();

  constructor() {
    this.loadThemeFromStorage();
  }

  /**
   * Apply the midnight theme
   */
  applyTheme(config?: Partial<ThemeConfig>): void {
    const themeConfig = config ? { ...this.DEFAULT_THEME_CONFIG, ...config } : this.DEFAULT_THEME_CONFIG;
    
    this.setThemeVariables(themeConfig);
    this.addThemeClass();
    this.saveThemeToStorage(themeConfig);
    
    this.themeConfigSubject.next(themeConfig);
    this.isActiveSubject.next(true);
  }

  /**
   * Remove the midnight theme
   */
  removeTheme(): void {
    this.removeThemeClass();
    this.removeThemeVariables();
    this.removeThemeFromStorage();
    
    this.isActiveSubject.next(false);
  }

  /**
   * Toggle theme on/off
   */
  toggleTheme(): void {
    if (this.isActiveSubject.value) {
      this.removeTheme();
    } else {
      this.applyTheme();
    }
  }

  /**
   * Update specific theme properties
   */
  updateThemeConfig(config: Partial<ThemeConfig>): void {
    const currentConfig = this.themeConfigSubject.value;
    const updatedConfig = { ...currentConfig, ...config };
    
    this.applyTheme(updatedConfig);
  }

  /**
   * Get current theme configuration
   */
  getCurrentThemeConfig(): ThemeConfig {
    return this.themeConfigSubject.value;
  }

  /**
   * Check if theme is currently active
   */
  isThemeActive(): boolean {
    return this.isActiveSubject.value;
  }

  /**
   * Reset theme to default configuration
   */
  resetToDefault(): void {
    this.applyTheme(this.DEFAULT_THEME_CONFIG);
  }

  /**
   * Get default theme configuration
   */
  getDefaultThemeConfig(): ThemeConfig {
    return { ...this.DEFAULT_THEME_CONFIG };
  }

  /**
   * Set CSS custom properties for the theme
   */
  private setThemeVariables(config: ThemeConfig): void {
    const root = document.documentElement;
    
    root.style.setProperty('--cx-color-primary', config.primaryColor);
    root.style.setProperty('--cx-color-secondary', config.secondaryColor);
    root.style.setProperty('--cx-color-background', config.backgroundColor);
    root.style.setProperty('--cx-color-text', config.textColor);
    root.style.setProperty('--cx-color-accent', config.accentColor);
    root.style.setProperty('--cx-color-border', config.borderColor);
    root.style.setProperty('--cx-color-shadow', config.shadowColor);
  }

  /**
   * Remove CSS custom properties
   */
  private removeThemeVariables(): void {
    const root = document.documentElement;
    
    root.style.removeProperty('--cx-color-primary');
    root.style.removeProperty('--cx-color-secondary');
    root.style.removeProperty('--cx-color-background');
    root.style.removeProperty('--cx-color-text');
    root.style.removeProperty('--cx-color-accent');
    root.style.removeProperty('--cx-color-border');
    root.style.removeProperty('--cx-color-shadow');
  }

  /**
   * Add theme CSS class to body
   */
  private addThemeClass(): void {
    document.body.classList.add('midnight-theme');
  }

  /**
   * Remove theme CSS class from body
   */
  private removeThemeClass(): void {
    document.body.classList.remove('midnight-theme');
  }

  /**
   * Save theme configuration to localStorage
   */
  private saveThemeToStorage(config: ThemeConfig): void {
    try {
      const themeData = {
        config,
        isActive: true,
        timestamp: Date.now()
      };
      localStorage.setItem(this.THEME_STORAGE_KEY, JSON.stringify(themeData));
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }

  /**
   * Load theme configuration from localStorage
   */
  private loadThemeFromStorage(): void {
    try {
      const storedData = localStorage.getItem(this.THEME_STORAGE_KEY);
      if (storedData) {
        const themeData = JSON.parse(storedData);
        if (themeData.isActive && themeData.config) {
          this.applyTheme(themeData.config);
        }
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error);
    }
  }

  /**
   * Remove theme data from localStorage
   */
  private removeThemeFromStorage(): void {
    try {
      localStorage.removeItem(this.THEME_STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to remove theme from localStorage:', error);
    }
  }

  /**
   * Generate theme variations for different contexts
   */
  generateThemeVariations(): { [key: string]: ThemeConfig } {
    const baseConfig = this.DEFAULT_THEME_CONFIG;
    
    return {
      default: baseConfig,
      highContrast: {
        ...baseConfig,
        primaryColor: '#000000',
        secondaryColor: '#111111',
        backgroundColor: '#000000',
        textColor: '#ffffff',
        borderColor: '#666666'
      },
      softDark: {
        ...baseConfig,
        primaryColor: '#1a1a1a',
        secondaryColor: '#2d2d2d',
        backgroundColor: '#121212',
        textColor: '#e0e0e0',
        borderColor: '#404040'
      },
      blueAccent: {
        ...baseConfig,
        accentColor: '#007bff'
      },
      greenAccent: {
        ...baseConfig,
        accentColor: '#28a745'
      },
      purpleAccent: {
        ...baseConfig,
        accentColor: '#6f42c1'
      }
    };
  }

  /**
   * Apply a specific theme variation
   */
  applyThemeVariation(variationName: string): void {
    const variations = this.generateThemeVariations();
    const variation = variations[variationName];
    
    if (variation) {
      this.applyTheme(variation);
    } else {
      console.warn(`Theme variation '${variationName}' not found`);
    }
  }

  /**
   * Get available theme variation names
   */
  getAvailableVariations(): string[] {
    return Object.keys(this.generateThemeVariations());
  }
} 