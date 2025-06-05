/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 * 
 * NOTE: This module contains main application components
 * Shared form elements and utilities should be placed in app/shared/
 * 
 * To use this module, ensure you have the following dependencies installed:
 * - @angular/core
 * - @angular/common  
 * - @angular/forms
 * - @angular/router
 * - @spartacus/core (optional, uncomment imports when available)
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Spartacus imports (uncomment when Spartacus is installed)
// import { I18nModule, ConfigModule } from '@spartacus/core';

// Import shared components module for form elements and utilities
// import { SharedComponentsModule } from '../shared/shared-components.module';

// Main application components
import { HeroBannerComponent } from './hero-banner/hero-banner.component';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';

// Component services
import { HeroBannerService } from './hero-banner/hero-banner.service';
import { ProductGridService } from './product-grid/product-grid.service';
import { RecommendationsService } from './recommendations/recommendations.service';

@NgModule({
  declarations: [
    // Main application components
    HeroBannerComponent,
    ProductGridComponent,
    RecommendationsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    
    // Uncomment these when Spartacus is installed:
    // I18nModule,
    // ConfigModule,
    
    // Import shared components for form elements and utilities
    // SharedComponentsModule,
  ],
  exports: [
    // Export main components for use in other modules
    HeroBannerComponent,
    ProductGridComponent,
    RecommendationsComponent,
  ],
  providers: [
    // Component services
    HeroBannerService,
    ProductGridService,
    RecommendationsService,
  ],
})
export class ComponentsModule {} 