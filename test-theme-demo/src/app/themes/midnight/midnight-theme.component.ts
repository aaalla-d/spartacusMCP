/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, OnInit, Inject, DOCUMENT } from '@angular/core';
import { ThemeService } from '@spartacus/core';
import { ConfigService } from '@spartacus/core';
import { MidnightThemeService } from './midnight-theme.service';
import { ThemeConfig } from './models/theme-config.model';

@Component({
  selector: 'cx-midnight-theme',
  templateUrl: './midnight-theme.component.html',
  styleUrls: ['./midnight-theme.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MidnightThemeComponent implements OnInit {
  
  themeConfig: ThemeConfig = {
    primaryColor: '#000000',
    secondaryColor: '#1a1a1a',
    backgroundColor: '#0d0d0d',
    textColor: '#ffffff',
    accentColor: '#ff6b35',
    borderColor: '#333333',
    shadowColor: 'rgba(255, 255, 255, 0.1)'
  };

  constructor(
    private midnightThemeService: MidnightThemeService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.applyTheme();
    this.setThemeVariables();
  }

  private applyTheme(): void {
    // Apply theme class to body
    this.document.body.classList.add('midnight-theme');
    
    // Remove other theme classes if they exist
    this.document.body.classList.remove('default-theme', 'light-theme');
  }

  private setThemeVariables(): void {
    const root = this.document.documentElement;
    
    // Set CSS custom properties for the theme
    root.style.setProperty('--cx-color-primary', this.themeConfig.primaryColor);
    root.style.setProperty('--cx-color-secondary', this.themeConfig.secondaryColor);
    root.style.setProperty('--cx-color-background', this.themeConfig.backgroundColor);
    root.style.setProperty('--cx-color-text', this.themeConfig.textColor);
    root.style.setProperty('--cx-color-accent', this.themeConfig.accentColor);
    root.style.setProperty('--cx-color-border', this.themeConfig.borderColor);
    root.style.setProperty('--cx-color-shadow', this.themeConfig.shadowColor);
    
    // Additional theme variables
    root.style.setProperty('--cx-color-inverse', '#ffffff');
    root.style.setProperty('--cx-color-success', '#28a745');
    root.style.setProperty('--cx-color-warning', '#ffc107');
    root.style.setProperty('--cx-color-danger', '#dc3545');
    root.style.setProperty('--cx-color-info', '#17a2b8');
    
    // Spacing and layout
    root.style.setProperty('--cx-spacing-1', '0.25rem');
    root.style.setProperty('--cx-spacing-2', '0.5rem');
    root.style.setProperty('--cx-spacing-3', '0.75rem');
    root.style.setProperty('--cx-spacing-4', '1rem');
    root.style.setProperty('--cx-spacing-5', '1.25rem');
    root.style.setProperty('--cx-spacing-6', '1.5rem');
    
    // Border radius
    root.style.setProperty('--cx-border-radius', '0.375rem');
    root.style.setProperty('--cx-border-radius-lg', '0.5rem');
    
    // Shadows
    root.style.setProperty('--cx-box-shadow', '0 0.125rem 0.25rem rgba(255, 255, 255, 0.075)');
    root.style.setProperty('--cx-box-shadow-lg', '0 0.5rem 1rem rgba(255, 255, 255, 0.15)');
    root.style.setProperty('--cx-box-shadow-hover', '0 0.25rem 0.5rem rgba(255, 255, 255, 0.1)');
  }

  toggleTheme(): void {
    this.midnightThemeService.toggleTheme();
  }

  resetTheme(): void {
    this.midnightThemeService.resetToDefault();
  }
} 